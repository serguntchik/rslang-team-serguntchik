import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

export const App: React.FC = () => (
    <div className="App">
        <div className="wrapper wrapper__mane_page">
            <div className="wrapper_animation">
                <img src="/rslang_logo_colorfull-1.svg" alt="logo" className="App-logo_static" />
                <img src="/rs_lang_background_yellow.svg" alt="logo" className="App-logo left yellow" />
                <img src="/rs_lang_background_purple.svg" alt="logo" className="App-logo left " />
                <img src="/rs_lang_background_blue.svg" alt="logo" className="App-logo slow" />
            </div>
            <div className="wrapper_slider">
                <Carousel>
                    <div className="wrapper__slader_container">
                        <h1 className="h1">Our team</h1>
                        <span className="text__about">
                            We are Sergey, Victor, Lubomir and Olga - a team of young professionals in the Rolling
                            Scopes School React course, we offer you an application for learning English.
                        </span>
                        <Link to="/team">
                            <button className="btns btn_color1" type="button">
                                more
                            </button>
                        </Link>
                    </div>
                    <div className="wrapper__slader_container">
                        <h1 className="h1">RS Lang</h1>
                        <span className="text__about">
                            Now learning English is easy and fun! Play mini-games and learn to memorize words. The
                            dictionary contains all the words that were previously encountered in games. Repeat them
                            every day to consolidate the result.
                        </span>
                        <Link to="/team">
                            <button className="btns btn_color1" type="button">
                                more
                            </button>
                        </Link>
                    </div>
                </Carousel>
            </div>
        </div>
    </div>
);
