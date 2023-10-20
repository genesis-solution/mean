import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//video.js player
import "../../../assets/videojs/skins/shaka/videojs.min.css";
import "../../../assets/chatbox/customize.css";
import Hls from "hls.js";
import videojs from "video.js";
import "../../../assets/videojs/components/hlsjs.js";
import "../../../assets/videojs/components/nuevo.js";
import "../../../assets/videojs/components/videojs.events.js";
import { Container, Row, Col } from "react-bootstrap";

import { videoActions } from "../../../store/video";
import Chatbox from "../../../components/Chat/chatbox";
import useScript from "../../../components/Chat/useScript";
// import "../../../assets/chatbox/customize.css";
import { thumbUrl } from "../../../const/const";

import "../../../assets/chatbox/customize.css";

const LiveDetails = ({
  history,
  getStreamInfo,
  streaminfo,
  clearStreamInfo,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let channel_name = searchParams.get("channel_name");
  if (!channel_name) {
    console.log("channel_name error");
    // https://btc.cdn.playfullscreen.com/live-details/broadcaster/6531cb7ccc9b9d2310f5cd12
    const id = window.history.location.pathname.split("/")[3];
    // const url = window.location.href;
    // const regex = /\/live-details\/broadcaster\/(\w+)/;
    // const match = url.match(regex);
    // const id = match ? match[0] : null;
    channel_name = "playfull_" + id;
  }
  useScript({
    url: "https://nostri.chat/public/bundle.js",
    channel_name: channel_name,
  });

  let player = useRef();
  let videoContainer = useRef();

  useEffect(() => {
    const items = document.getElementsByClassName("item-end");
    console.log(items);
    for (let index in items) {
      const item = items[index];
      if (item.nodeName == "DIV") item.style.visibility = "visible";
    }

    // const url = window.location.href;
    // const regex = /\/live-details\/broadcaster\/(\w+)/;
    // const match = url.match(regex);
    // const id = match ? match[0] : null;
    const id = window.history.location.pathname.split("/")[3];
    const type = window.history.location.pathname.split("/")[2];
    getStreamInfo({ id, type });

    var elements = document.getElementsByClassName("item-end");
    if (elements) {
      elements[0].classList.add("custom-class-css");
    }

    return () => {
      const items = document.getElementsByClassName("item-end");
      console.log(items);
      for (let index in items) {
        const item = items[index];
        if (item.nodeName == "DIV") item.style.visibility = "hidden";
      }
      clearStreamInfo();
      player.dispose();
    };
  }, []);

  useEffect(() => {
    if (streaminfo) {
      if (!streaminfo.purchased) {
        history.push("/pricing-plan?hlsurl=" + streaminfo.id + "&type=live");
      } else {
        console.log(streaminfo);
        player = videojs(
          videoContainer.current,
          {
            controls: true,
            preload: true,
            playsinilie: true,
            autoplay: true,
          },
          function onPlayerReady() {
            console.log("Player Ready!");
            player.nuevo({
              title: streaminfo.name,
              video_id: "This is video Id",
            });

            var callback = function (videojsPlayer, hlsjs) {
              hlsjs.on(Hls.Events.MEDIA_ATTACHED, function (event, data) {
                console.log("Media attached");
              });
            };

            videojs.Html5Hlsjs.addHook("beforeinitialize", callback);
            player.src({
              src: streaminfo.hlsUrl,
              type: "application/x-mpegURL",
              poster: streaminfo.logo || streaminfo.logo_id,
            });
          }
        );
      }
    }
  }, [streaminfo]);

  useEffect(() => {}, [videoContainer]);

  return (
    <>
      {/* <Chatbox /> */}
      <div className="video-container iq-main-slider">
        <video className="video-js vjs-fluid" ref={videoContainer}></video>
      </div>
      <div className="main-content">
        <section className="movie-detail container-fluid">
          <Row>
            <Col lg="12">
              <div className="trending-info season-info g-border">
                <h4 className="trending-text big-title text-uppercase mt-0">
                  {streaminfo && streaminfo.name}
                </h4>
                {/* <div className="d-flex align-items-center text-white text-detail episode-name mb-0">
                  <span className="trending-year">
                    {selectedStream.description || selectedStream.alt_name}
                  </span>
                </div> */}
                <p className="trending-dec w-100 mb-0">
                  {streaminfo &&
                    (streaminfo.description || streaminfo.alt_name)}
                </p>
                {streaminfo && streaminfo.broadcaster ? (
                  <Link
                    to={"/broadcaster" + streaminfo.broadcaster.publish_point}
                  >
                    <div
                      className="d-flex align-items-center series mb-4"
                      style={{ marginTop: "10px" }}
                    >
                      {streaminfo.broadcaster.logo_id ? (
                        <img
                          src={thumbUrl + streaminfo.broadcaster.logo_id}
                          className="img-fluid"
                          alt=""
                          style={{ width: 50, height: 50 }}
                        />
                      ) : (
                        <div style={{ width: 50, height: 50 }}>
                          <div
                            style={{
                              width: 50,
                              height: 50,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#F3F6F9",
                              borderRadius: 5,
                              color: "#45CB85",
                            }}
                          >
                            {streaminfo.broadcaster.name[0]}
                          </div>
                        </div>
                      )}
                      <h5 className="text-gold ml-3">
                        {streaminfo.broadcaster.name}
                      </h5>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {streaminfo && streaminfo.team ? (
                  <div
                    className="d-flex align-items-center series mb-4"
                    style={{ marginTop: "10px" }}
                  >
                    {streaminfo.team.logo_id ? (
                      <img
                        src={thumbUrl + streaminfo.team.logo_id}
                        className="img-fluid"
                        alt=""
                        style={{ width: 50, height: 50 }}
                      />
                    ) : streaminfo && streaminfo.team ? (
                      <div style={{ width: 50, height: 50 }}>
                        <div
                          style={{
                            width: 50,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#F3F6F9",
                            borderRadius: 5,
                            color: "#45CB85",
                          }}
                        >
                          {streaminfo.team.name[0]}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <h5 className="text-gold ml-3">{streaminfo.team.name}</h5>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  streaminfo: state.videos.streaminfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getStreamInfo: (path) => {
      dispatch(videoActions.getStreamInfo(path));
    },
    clearStreamInfo: () => {
      dispatch(videoActions.clearStreamInfo());
    },
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LiveDetails
);
