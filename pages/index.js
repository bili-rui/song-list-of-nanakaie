import React, { useState, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

import MusicList from "../public/music_list_7.json";

import SongDetail from "../components/SongDetail.component";
import MandarinBtn from "../components/MandarinBtn.component";
import ChevronSVG from "../components/ChevronSVG.component";
import BiliPlayerModal from "../components/BiliPlayerModal.component";

import imageLoader from "../utils/ImageLoader";

export default function Home() {
  //状态保存: 类别选择, 搜索框, 回到顶部按钮, 移动端自我介绍, 试听窗口
  const [categorySelection, setCategotySelection] = useState({
    lang: "",
    initial: "",
    paid: false,
    remark: "",
  });
  const [searchBox, setSearchBox] = useState("");
  const [showToTopButton, setToTopShowButton] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [modalPlayerShow, setPlayerModalShow] = useState(false);
  const [modalPlayerSongName, setPlayerModalSongName] = useState("");
  const [BVID, setBVID] = useState("");

  useEffect(() => {
    //检测窗口滚动
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 600) {
        setToTopShowButton(true);
      } else {
        setToTopShowButton(false);
      }
    });
  }, []);

  //根据首字母和搜索框进行过滤
  const filteredSongList = MusicList.filter(
    (song) =>
      //搜索框搜歌名
      (song.song_name
        ?.toString()
        .toLowerCase()
        .includes(searchBox ? searchBox.toLowerCase() : "") ||
        //搜索框搜语言
        song.language
          ?.toString()
          .toLowerCase()
          .includes(searchBox ? searchBox.toLowerCase() : "") ||
        //搜索框搜备注
        song.remarks
          ?.toString()
          .toLowerCase()
          .includes(searchBox ? searchBox.toLowerCase() : "") ||
        song.artist
          ?.toString()
          .toLowerCase()
          .includes(searchBox ? searchBox.toLowerCase() : "")) &&
      //语言过滤按钮
      (categorySelection.lang != ""
        ? song.language?.includes(categorySelection.lang)
        : true) &&
      //首字母过滤按钮
      (categorySelection.initial != ""
        ? song.initial?.includes(categorySelection.initial)
        : true) &&
      //备注过滤按钮
      (categorySelection.remark != ""
        ? song.remarks?.toLowerCase().includes(categorySelection.remark)
        : true) &&
      //付费过滤按钮
      (categorySelection.paid ? song.paid == 1 : true)
  );

  //处理用户复制行为
  const handleClickToCopy = (song) => {
    // 统一复制格式为：点歌 + 空格 + 歌名
    copy("点歌 " + song.innerText);
    
    // 发送Toast提示
    if (song.id.includes("paid")) {
      toast.success(
        `付费曲目 "` +
          song.innerText +
          `" 成功复制到剪贴板!记得发100的SC或者水晶球哦~`
      );
    } else {
      toast.success(`"` + song.innerText + `" 成功复制到剪贴板!`);
    }
  };

  //改变语言过滤状态
  const setLanguageState = (lang) => {
    setCategotySelection({ lang: lang, initial: "", paid: false, remark: "" });
  };

  //改变首字母过滤状态
  const setInitialState = (initial) => {
    setCategotySelection({
      lang: "国语",
      initial: initial,
      paid: false,
      remark: "",
    });
  };

  //改变备注过滤状态
  const setRemarkState = (remark) => {
    setCategotySelection({
      lang: "",
      initial: "",
      paid: false,
      remark: remark,
    });
  };

  //改变收费过滤状态
  const setPaidState = (paid) => {
    setCategotySelection({ lang: "", initial: "", paid: paid, remark: "" });
  };

  //随便听听
  const handleRandomSong = () => {
    //定位歌单
    let parentSelector = document.querySelector(".songList");
    //随机生成序号
    let random = Math.floor(
      1 + Math.random() * parentSelector.childElementCount
    );
    let songName_ = document.querySelector(
      ".songList>tr:nth-child(" + random + ")"
    ).childNodes[1];
    
    if (!songName_) {
      toast.info("歌单已经没歌了!");
    } else {
      // 统一复制格式为：点歌 + 空格 + 歌名
      copy("点歌 " + songName_.innerText);
      
      if (songName_.id.includes("paid")) {
        toast.success(
          `付费曲目 "` +
            songName_.innerText +
            `" 成功复制到剪贴板!记得发100的SC或者水晶球哦~`
        );
      } else {
        toast.success(`"` + songName_.innerText + `" 成功复制到剪贴板!`);
      }
    }
  };

  //移动端自我介绍off canvas开关
  const handleCloseIntro = () => setShowIntro(false);
  const handleShowIntro = () => setShowIntro(true);

  //滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.outerContainer}>
      {/* 真实的直播间链接 */}
      <Link href="https://live.bilibili.com/1772924729" passHref>
        <a target="_blank" style={{ textDecoration: "none", color: "#1D0C26" }}>
          <div className={styles.goToLiveDiv}>
            <div className={styles.cornerToggle}>
              <Image
                loader={imageLoader}
                src="bilibili_logo_padded.png"
                alt="打开直播间"
                width={50}
                height={50}
              />
              <b>
                <i>去直播间</i>
              </b>
            </div>
          </div>
        </a>
      </Link>
      <div className={styles.offCanvasToggleDiv} onClick={handleShowIntro}>
        <div className={styles.cornerToggle}>
          <div style={{ borderRadius: "100% !important" }}>
            <Image
            loader={imageLoader}
            src="tiny_avatar.webp" 
            alt="打开自我介绍"
            width={50}
            height={50}
            />
          </div>
          <b>
            <i>自我介绍</i>
          </b>
        </div>
      </div>
      <Container>

        <Head>
          <title>韩二吖Echoes的歌单</title>
          <meta
            name="keywords"
            content="韩二吖Echoes,韩二吖,B站,bilibili,哔哩哔哩,电台唱见,歌单"
          />
          <meta name="description" content="韩二吖Echoes的歌单" />
          <meta name="theme-color" content="#151516" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name='format-detection' content='telephone=no' />
          
          <link rel='shortcut icon' type="image/x-icon" sizes="48x48" href='/favicon.ico' />
          <link rel="icon" type="image/png" sizes="192x192"  href="/a2hs/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/a2hs/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/a2hs/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/a2hs/favicon-16x16.png" />
          <link rel="manifest" href="/a2hs/manifest.json" />
        </Head>

        <section className={styles.main}>
          {/** 头像和标题 */}
          <Row>
            <Col className={styles.titleCol}>
              <div className={"pt-3 " + styles.titleBox}>
                {/* 给大头像添加跳转链接 */}
                <Link href="https://space.bilibili.com/1184434512" passHref>
                  <a target="_blank" style={{ cursor: "pointer" }} title="访问二吖的B站主页">
                    <Image
                      loader={imageLoader}
                      className={styles.avatar}
                      src="avatar.png"
                      alt="韩二吖的头像"
                      width={250}
                      height={250}
                    />
                  </a>
                </Link>
                <h1
                  className={"display-6 text-center pt-3 " + styles.grandTitle}
                >
                  韩二吖Echoes
                </h1>
                <h1 className={"display-6 text-center " + styles.grandTitle}>
                  和她拿手的<b>{filteredSongList.length}</b>首歌
                </h1>
                <p className="text-center py-3 mb-xl-5 text-muted">
                  轻点歌名可以复制哦
                </p>
              </div>
              <div className={styles.introBox}>
                <div className={styles.introBoxInnerDiv}>
                  <div className={styles.introTitle}>
                    <h5>韩二吖的自我介绍</h5>
                  </div>
                  <p className={styles.introParagraph}>
                    🎤 哈喽，这里是韩二吖Echoes！（在这里填写属于你的个性化自我介绍文字哦~ 可以写你的生日、爱好等等）
                  </p>
                  <p className={styles.introParagraph}>
                    🎵 直播内容主打唱歌和聊天，歌曲语言包括国语等，欢迎大家来直播间听歌放松！
                  </p>
                  <p className={styles.introParagraph}>
                    🌟 本直播间点歌规则：（请在这里写上你的点歌要求，比如是否需要打赏、有没有免流名额等）
                  </p>
                  <p className={styles.introParagraph}>
                    ✨ 感谢每一个来到直播间陪伴我的朋友，希望我们能在这里一起度过开心的时光！
                  </p>
                  <div className="d-flex flex-nowrap justify-content-evenly">
                    {/* 真实的歌切B站链接 */}
                    <Link
                      href="https://space.bilibili.com/1184434512"
                      passHref
                    >
                      <a target="_blank">
                        <Button
                          className={styles.customRandomButton}
                          style={{ marginTop: 0, border: "2px solid #B4A96D" }}
                        >
                          <img
                            className={styles.biliIcon}
                            src="/gui_shang.webp"
                            alt="歌切贴图"
                          />{" "}
                          二吖歌切 <ChevronSVG />
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/** 过滤器控件 */}
          <Row>
            <Col>
              <div className={styles.categorySelectionContainer}>
                <h5 className={styles.categorySelectionTitle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                    style={{ verticalAlign: "baseline" }}
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>{" "}
                  挑个想听的类别呗~
                </h5>
                <Container fluid>
                  <Row>
                    <Col xs={6} md={3}>
                      <MandarinBtn
                        languageFilter={categorySelection.lang}
                        initialFilter={categorySelection.initial}
                        setLanguageState={setLanguageState}
                        setInitialState={setInitialState}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-grid">
                        <Button
                          className={
                            categorySelection.lang == "粤语"
                              ? styles.customCategoryButtonActive
                              : styles.customCategoryButton
                          }
                          onClick={(e) => {
                            categorySelection.lang == "粤语"
                              ? setLanguageState("")
                              : setLanguageState("粤语");
                          }}
                        >
                          粤语
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-grid">
                        <Button
                          className={
                            categorySelection.remark == "古风"
                              ? styles.customCategoryButtonActive
                              : styles.customCategoryButton
                          }
                          onClick={(e) => {
                            categorySelection.remark == "古风"
                              ? setRemarkState("")
                              : setRemarkState("古风");
                          }}
                        >
                          古风
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-grid">
                        <Button
                          className={
                            categorySelection.remark == "民谣"
                              ? styles.customCategoryButtonActive
                              : styles.customCategoryButton
                          }
                          onClick={(e) => {
                            categorySelection.remark == "民谣"
                              ? setRemarkState("")
                              : setRemarkState("民谣");
                          }}
                        >
                          民谣
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-grid">
                        <Button
                          className={
                            categorySelection.remark == "rap"
                              ? styles.customCategoryButtonActive
                              : styles.customCategoryButton
                          }
                          onClick={(e) => {
                            categorySelection.remark == "rap"
                              ? setRemarkState("")
                              : setRemarkState("rap");
                          }}
                        >
                          Rap
                        </Button>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-grid">
                        <Button
                          className={
                            categorySelection.paid
                              ? styles.customCategoryButtonActive
                              : styles.customCategoryButton
                          }
                          onClick={(e) => {
                            categorySelection.paid
                              ? setPaidState(false)
                              : setPaidState(true);
                          }}
                        >
                          付费
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={9}>
              <Form.Control
                className={styles.filters}
                type="search"
                aria-label="搜索"
                placeholder="搜索"
                onChange={(e) => setSearchBox(e.target.value)}
              />
            </Col>
            <Col xs={12} md={3}>
              <div className="d-grid">
                <Button
                  title="从下面的歌单里随机挑一首"
                  className={styles.customRandomButton}
                  onClick={handleRandomSong}
                >
                  随便听听
                </Button>
              </div>
            </Col>
          </Row>
          {/** 歌单表格 */}
          <Row>
            <Col>
              <div className={styles.songListMarco}>
                <Container fluid style={{padding: 0}}>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th></th>
                        <th>歌名</th>
                        <th></th>
                        <th>歌手</th>
                        <th>语言</th>
                        <th>备注</th>
                      </tr>
                    </thead>
                    <tbody className="songList">
                      <SongDetail
                        filteredSongList={filteredSongList}
                        handleClickToCopy={handleClickToCopy}
                        setBVID={setBVID}
                        setPlayerModalShow={setPlayerModalShow}
                        setPlayerModalSongName={setPlayerModalSongName}
                      />
                    </tbody>
                  </Table>
                </Container>
              </div>
            </Col>
          </Row>
        </section>
        {showToTopButton ? (
          <button
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            title="返回顶部"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </button>
        ) : (
          <div></div>
        )}
        <footer className={styles.footer}>
          Copyright © 2024 韩二吖Echoes和她的家人们
        </footer>
      </Container>
      <Offcanvas show={showIntro} onHide={handleCloseIntro}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>韩二吖的自我介绍</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className={styles.introParagraph}>
            🎤 哈喽，这里是韩二吖Echoes！（在这里填写属于你的个性化自我介绍文字哦~）
          </p>
          <p className={styles.introParagraph}>
            🎵 直播内容主打唱歌和聊天，欢迎大家来直播间听歌放松！
          </p>
          <p className={styles.introParagraph}>
            🌟 本直播间点歌规则：（请在这里填写您的点歌规则）
          </p>
          <p className={styles.introParagraph}>
            ✨ 感谢每一个来到直播间陪伴我的朋友，希望我们能在这里一起度过开心的时光！
          </p>
          {/* 真实的歌切链接 */}
          <Link href="https://space.bilibili.com/1184434512" passHref>
            <a target="_blank">
              <Button
                className={styles.customRandomButton}
                style={{ border: "2px solid #1D0C26", width: "100%" }}
              >
                <img
                  className={styles.biliIcon}
                  src="/gui_shang.webp"
                  alt="歌切贴图"
                />{" "}
                二吖歌切 <ChevronSVG />
              </Button>
            </a>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
      <BiliPlayerModal
        show={modalPlayerShow}
        onHide={() => setPlayerModalShow(false)}
        BVID={BVID}
        modalPlayerSongName={modalPlayerSongName}
      />
    </div>
  );
}