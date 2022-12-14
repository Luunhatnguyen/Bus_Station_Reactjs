import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { endpoints } from "../configs/Apis";
import { useSelector } from "react-redux";
import cookies from "react-cookies";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WOW from "wowjs";
import Header from "../components/Header";

import pageTitle6 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import advice1 from "../static/image/advice/advice-1.jpg";
import PreLoader from "../components/PreLoader";
import MessageSnackbar from "../components/MessageSnackbar";

function ArticalDetails(props) {
  const [bus, setBus] = useState([]);
  const [lastestArticals, setLastestArticals] = useState([]);

  const [actionType, setActionType] = useState(1);
  const [stylebtLike, setstylebtLike] = useState(null);
  const [likesChange, setLikesChange] = useState(null);

  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentChange, setCommentChange] = useState(0);

  const { busId } = useParams();

  let user = useSelector((state) => state.user.user);

  // State of message
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");

  const handleMessageClose = () => {
    setOpen(false);
  };

  const createMessage = (title, msg, type) => {
    setMsg(msg);
    setTitleMsg(title);
    setTypeMsg(type);
  };
  // End message

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  useEffect(() => {
    let getArtical = async () => {
      try {
        let res = await API.get(endpoints["bus-details"](busId), {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });
        setBus(res.data);
        setActionType(res.data.type);
        if (res.data.type === 1 || res.data.type === -1)
          setstylebtLike("outlined");
        else setstylebtLike("contained");
      } catch (error) {
        console.error(error);
      }
    };

    let getComments = async () => {
      try {
        let res = await API.get(endpoints["bus-comments"](busId));
        setListComment(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getArtical();
    getComments();
  }, [busId, commentChange, likesChange]);

  /* Handle like function */
  const addLike = async (event) => {
    if (user != null) {
      let type = null;
      if (actionType === 1 || actionType === -1) {
        type = 0;
        setstylebtLike("contained");
      } else {
        type = 1;
        setstylebtLike("outlined");
      }

      try {
        await API.post(
          endpoints["like"](busId),
          {
            type: type,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.load("access_token")}`,
            },
          }
        );
        setActionType(type);
        setLikesChange(type);
      } catch (error) {
        console.error(error);
      }
    } else {
      setOpen(true);
      createMessage("C???nh b??o", "H??y ????ng nh???p ????? c?? th??? like", "warning");
    }
  };
  /* End Like Function */

  /* Handle Comment Function */
  const addComment = async (event) => {
    event.preventDefault();
    if (user != null) {
      try {
        let res = await API.post(
          endpoints["add-comment-bus"](busId),
          {
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.load("access_token")}`,
            },
          }
        );

        if (res.status === 201) {
          setOpen(true);
          createMessage("Th??nh c??ng", "????ng b??nh lu???n th??nh c??ng", "success");

          listComment.push(res.data);
          setListComment(listComment);
          setCommentChange(listComment.length);
          setComment("");
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("L???i", "????ng b??nh lu???n th???t b???i", "error");
      }
    } else {
      setOpen(true);
      createMessage("C???nh b??o", "H??y ????ng nh???p ????? c?? th??? b??nh lu???n", "warning");
    }
  };

  // if (artical.length === 0) {
  //     return <PreLoader />
  // }

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle6})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Detail Garage</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="news-block-one">
                  <div className="inner-box">
                    <div className="lower-content">
                      <div className="category">
                        <Link to="/">
                          <span className="post-date">
                            <i className="fas fa-bus-alt" />
                            {bus.busModel}
                          </span>
                        </Link>
                      </div>
                      <h2>{bus.name}</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `${bus.description}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h2>T???i sao l???i ?????t xe kh??ch t???i NhaXe?</h2>
                <div className="text">
                  <p>
                    N???i th???t sang tr???ng b???c nh???t, ch??? ng???i th???a m??i, ?????y ????? ti???n
                    nghi nh?? kh??ch s???n
                  </p>
                  <p>
                    T???t c??? ?????u l?? xe ?????i m???i T???t c??? nh???ng xe ????a r?????c t???i NhaXe
                    ?????u l?? xe ?????i m???i ????? cho du kh??ch c?? nh???ng tr???i nghi???m t???t
                    nh???t trong su???t qu?? tr??nh di chuy???n. Nh???ng lo???i xe ?????i c??
                    th?????ng hay g???p c??c v???n ????? nh??: m??y kh??ng ??m, xe hay b??? x??c,
                    ??i???u h??a kh??ng t???t, kh??ng gian ch???t h???p, xe hao t???n nhi??n
                    li???u,??? Gi?? c??? h???p l?? Gi?? c??? lu??n l?? nh???ng ??u ti??n h??ng ?????u
                    c???a du kh??ch n??n NhaXe cung c???p nh???ng nh?? xe uy t??n v?? ch???t
                    l?????ng nh???t ???????c k?? k???t h???p ?????ng r?? r??ng gi???a 2 b??n. Ti???t
                    ki???m th???i gian Thay v?? ph???i ?????n t???n b???n xe, ch??? ?????i, x???p
                    h??ng t???n nhi???u c??ng s???c ????? ch??? mua m???t t???m v?? th?? ch??? b???ng
                    nh???ng c?? click chu???t hay m???t cu???c g???i ??i???n tho???i ????n gi???n
                    b???n ???? c?? th??? s??? h???u m???t t???m v?? nh?? mong mu???n cho chuy???n ??i
                    c???a m??nh.
                  </p>
                  <p>
                    V???a ??i v???a l??m vi???c th???a m??i
                    <div>B??n c???nh ???? c??c d???ch v??? mi???n ph?? tr??n xe bao g???m:</div>
                    <div>H?????ng d???n</div>
                    <div>Wifi</div>
                    <div>N?????c u???ng</div>
                    <div>Kh??n l???nh</div>
                    <div>????? ??n nh???</div>
                  </p>
                </div>

                <div className="post-share-option clearfix">
                  <div className="text pull-left">
                    <h3>We Are Social On:</h3>
                  </div>
                  <ul className="social-links pull-right clearfix">
                    <li>
                      <Link to="/">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-google-plus-g" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar default-sidebar ml-20">
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{ backgroundImage: `url(${advice1})` }}
                  >
                    <div className="text">
                      <h2>
                        Get <br />
                        25% Off <br />
                        On New York Tours
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MessageSnackbar
        handleClose={handleMessageClose}
        isOpen={open}
        msg={msg}
        type={typeMsg}
        title={titleMsg}
      />
    </>
  );
}

export default ArticalDetails;

function CommentItem(props) {
  return (
    <div className="comment">
      <figure className="thumb-box">
        <Avatar
          alt="ImageComment"
          src={props.comment.user.avatar}
          sx={{ width: 52, height: 52 }}
        />
      </figure>
      <div className="comment-inner">
        <div className="comment-info clearfix">
          <span className="post-date">{props.comment.created_date}</span>
        </div>
        <p>{props.comment.content}</p>
        <div className="author-comment">
          <span>B??nh lu???n b???i:</span> {props.comment.user.username}
        </div>
      </div>
    </div>
  );
}
