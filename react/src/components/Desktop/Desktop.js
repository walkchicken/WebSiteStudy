import React, { Component } from 'react'
import web from './video/web.mp4'
import '../Desktop/desktop.css'
import { useEffect, useState } from "react";
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components';


const FooterStyle = styled.div`
  background-color: var(--deep-dark);
  padding-top: 10rem;
  .container {
    display: flex;
    gap: 3rem;
  }
  .footer__col1 {
    flex: 2;
  }
  .footer__col2,
  .footer__col3,
  .footer__col4 {
    flex: 1;
  }
  .footer__col1__title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  .copyright {
    background-color: var(--dark-bg);
    text-align: left;
    padding: 1rem 0;
    margin-top: 5rem;
    .para {
      margin-left: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 0rem;
      & > div {
        margin-top: 5rem;
      }
    }
    .footer__col1 .para {
      max-width: 100%;
    }
    .copyright {
      .container {
        div {
          margin-top: 0;
        }
      }
    }
  }
`;


function Desktop() {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(`${year}-8-1`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Minutes: Math.floor((difference / 1000 / 60) % 60),
                Seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [year] = useState(new Date().getFullYear());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
    return (
        <div>
            <div className="desktop-form" id="form">
                <nav style={{
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    zIndex: 100,
                    top: 0,
                    left: 0,
                    right: 0
                }}>
                    <Link to="/login">
                        <input type="submit" value="Admin" className="admin" />
                    </Link>
                </nav>

                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: "-1"
                    }}
                >
                    <source src={web} type='video/mp4' id="myVideo" />
                </video>

                <h1 className="tiltename">DARK SHOP <br /> PERFUMES AUTHENTIC</h1>

                <div className="title">
                    <a href="#count">
                        <input type="submit" value="GET EVENTS NOW" className="buy" />
                    </a>
                </div>
            </div>
            <div className="count" id="count">
                <h2 className="namecount"> COMING SOON {year} </h2>
                <h1 id="open"> OPEN !!!</h1>
                <div className="count-form">
                    <div>
                        {timerComponents.length ? timerComponents : <span >Time's up!</span>}
                    </div>
                </div>
            </div >
            <div>
                <FooterStyle>
                    <div className="container">
                        <div className="footer__col1">
                            <h1 className="footer__col1__title">
                                <Link to="/register">
                                    <input type="submit" value="Register" className="register" />
                                </Link>
                                <p>as a member to receive free events</p></h1>
                        </div>
                        <div className="footer__col2">
                            <p>
                                Free shipping when you buy online
                            </p>
                        </div>
                        <div className="footer__col3">
                            <p>
                                5%-10% off bill when buying at the store
                            </p>
                        </div>
                        <div className="footer__col4">
                            <p>
                                Get special gifts on special days
                            </p>
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="container">
                            <p>
                                Langding Pages Shop
                                <a href="#form"> Dark Shop </a> PerFumes
                            </p>
                        </div>
                    </div>
                </FooterStyle>
            </div>
        </div>
    )
}

export default Desktop
