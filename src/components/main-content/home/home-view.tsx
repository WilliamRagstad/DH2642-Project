import React from 'react';
import { Card, CardContent, CardHeader, Divider, H3, H4, H5, Body1, Subtitle1 } from 'ui-neumorphism';
import soundbundleIcon from '../../../images/soundBundle.png';
import YouTube from 'react-youtube';

const HomeView = () => {
	return (
		<React.Fragment>
			<Card className="view-card flex-parent flex-column float-container" inset rounded>
				<CardContent className="home-container">
					<Card className="home-view-card float-item">
						<CardHeader className="home-view-card-header">
							<img className="home-img" src={soundbundleIcon} alt={""} />
							<H3>SoundBundle</H3>
							<Body1>A streaming platform for collecting music from various sources</Body1>
						</CardHeader>
						<CardContent>
							<H4>Greetings</H4>
							<Body1>
								Welcome to <b>Soundbundle</b>!
                                <br />
								<br />
                                This is William Rågstad, Vilgot Ledstam and Ludvig Lindéns <em>DH2642 HT20-1 Interaktionsprogrammering och dynamiska webben</em> course project.
                                It is an neumorphic web platform for searching and listening to music
                                from various sources with full support for lyrics.
                                <br /><br />
                                Read more in our <a href="https://docs.google.com/document/d/1utB0_hyB3Sd4W2NWbWYI2HrTHzZCfNOXKaQLORdG7q4/edit?usp=sharing" target="_blank">project specification</a>
								<br /><br />
								Now when we've gotten to know each other a bit more, let's take a closer look at how you can <a href="#get-started">get started</a> in the best way. <em>Good luck!</em>
							</Body1>

							<Divider dense />
							<br id="get-started" />

							<H4>Get started</H4>
							<Body1>
								To get started using SoundBundle, you may first want to pair your Spotify, YouTube or SoundCloud accounts with us.
								Go to <b>services</b> in settings and connect them with SoundBundle.
								<br />
								<br />
								Secondly, we would recommend you to take a look at the navigation sidebar and start clicking around learning more about what SoundBundle offers.
							</Body1>

							<H4>Features</H4>
							<ul>
								<li>Connect to your favorite music platforms</li>
								<li>Modern and minimalistic design</li>
								<li>High usability</li>
								<li>Watch <a rel="noreferrer" href="http://shorturl.at/fDJR5" target="_blank">our demonstration video</a></li>
							</ul>

							<H4>Pages</H4>
							<H5>Home</H5>
							<Body1>
								This is where you are now, use the buttons to the left and you can then navigate to different pages.
                                </Body1>
							<H5>Search</H5>
							<Body1>
								Here you can search for songs from various sources,
								just choose a service and input a query to search.
                                </Body1>
							<H5>Playlists</H5>
							<Body1>
								This is where you can view your playlists from different services
								and also make playlists mixing tracks from different services into one.
                                </Body1>
							<H5>Lyrics</H5>
							<Body1>
								This page is where you can find lyrics for songs.
								You can either view lyrics for the song you are currently playing
								or search for a different songs lyrics.
                                </Body1>
							<H5>Settings</H5>
							<Body1>
								Here you can change settings for the website. You can find visual settings and user settings here,
								this is also where you connect to services such as Spotify.
                                    <br />
								<b>IMPORTANT</b>: You will need a Spotify premium account to be able to connect to Spotify.
                            </Body1>

						</CardContent>
					</Card>
				</CardContent>
			</Card>
		</React.Fragment>
	)
}

export default HomeView;