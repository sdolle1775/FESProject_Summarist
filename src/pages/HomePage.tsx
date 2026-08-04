import {
  Crown,
  FileText,
  Lightbulb,
  Mic2,
  Sprout,
  Star,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const reviews = [
  ["Hanna M.", "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers."],
  ["David B.", "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive."],
  ["Nathan S.", "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading."],
  ["Ryan R.", "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content."],
];

const stats = [
  ["93%", "of Summarist members significantly increase reading frequency."],
  ["96%", "of Summarist members establish better habits."],
  ["90%", "have made significant positive change to their lives."],
];

const statsTwo = [
  ["91%", "of Summarist members report feeling more productive after incorporating the service into their daily routine."],
  ["94%", "of Summarist members have noticed an improvement in their overall comprehension and retention of information."],
  ["88%", "of Summarist members feel more informed about current events and industry trends since using the platform."],
];

export function HomePage() {
  const { openAuth } = useAuth();

  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="home-row home-nav-inner">
          <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="Summarist" />
          <ul>
            <li><button onClick={() => openAuth("login")}>Login</button></li>
            <li className="not-allowed">About</li>
            <li className="not-allowed">Contact</li>
            <li className="not-allowed">Help</li>
          </ul>
        </div>
      </nav>

      <section className="home-section hero">
        <div className="home-row hero-inner">
          <div className="hero-copy">
            <h1>Gain more knowledge<br />in less time</h1>
            <p>Great summaries for busy people,<br />individuals who barely have time to read,<br />and even people who don’t like to read.</p>
            <button className="primary-button home-cta" onClick={() => openAuth("login")}>Login</button>
          </div>
          <figure><img src={`${import.meta.env.BASE_URL}assets/landing.png`} alt="A reader reviewing a book summary" /></figure>
        </div>
      </section>

      <section className="home-section">
        <div className="home-row">
          <h2 className="home-heading">Understand books in few minutes</h2>
          <div className="feature-grid">
            <div><FileText /><h3>Read or listen</h3><p>Save time by getting the core ideas from the best books.</p></div>
            <div><Lightbulb /><h3>Find your next read</h3><p>Explore book lists and personalized recommendations.</p></div>
            <div><Mic2 /><h3>Briefcasts</h3><p>Gain valuable insights from briefcasts.</p></div>
          </div>

          <div className="statistics-block">
            <div className="statistics-headings">
              {['Enhance your knowledge', 'Achieve greater success', 'Improve your health', 'Develop better parenting skills', 'Increase happiness', 'Be the best version of yourself!'].map((text, index) => (
                <h3 className={index === 1 ? "active" : ""} key={text}>{text}</h3>
              ))}
            </div>
            <div className="statistics-card">
              {stats.map(([number, text]) => <div key={number}><strong>{number}</strong><p>{text}</p></div>)}
            </div>
          </div>
          <div className="statistics-block statistics-block--reverse">
            <div className="statistics-card">
              {statsTwo.map(([number, text]) => <div key={number}><strong>{number}</strong><p>{text}</p></div>)}
            </div>
            <div className="statistics-headings statistics-headings--right">
              {['Expand your learning', 'Accomplish your goals', 'Strengthen your vitality', 'Become a better caregiver', 'Improve your mood', 'Maximize your abilities'].map((text, index) => (
                <h3 className={index === 1 ? "active" : ""} key={text}>{text}</h3>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section reviews-section">
        <div className="home-row">
          <h2 className="home-heading">What our members say</h2>
          <div className="reviews-list">
            {reviews.map(([name, quote]) => (
              <article className="review-card" key={name}>
                <header><strong>{name}</strong><span aria-label="five stars">★★★★★</span></header>
                <p>{quote}</p>
              </article>
            ))}
          </div>
          <button className="primary-button home-cta centered" onClick={() => openAuth("login")}>Login</button>
        </div>
      </section>

      <section className="home-section">
        <div className="home-row">
          <h2 className="home-heading">Start growing with Summarist now</h2>
          <div className="number-grid">
            <div><Crown /><strong>3 Million</strong><p>Downloads on all platforms</p></div>
            <div><Star /><strong>4.5 Stars</strong><p>Average ratings on iOS and Google Play</p></div>
            <div><Sprout /><strong>97%</strong><p>Of Summarist members create a better reading habit</p></div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-row footer-grid">
          <div><h3>Actions</h3><p>Summarist Magazine</p><p>Cancel Subscription</p><p>Help</p><p>Contact us</p></div>
          <div><h3>Useful Links</h3><p>Pricing</p><p>Summarist Business</p><p>Gift Cards</p><p>Authors & Publishers</p></div>
          <div><h3>Company</h3><p>About</p><p>Careers</p><p>Partners</p><p>Code of Conduct</p></div>
          <div><h3>Other</h3><p>Sitemap</p><p>Legal Notice</p><p>Terms of Service</p><p>Privacy Policies</p></div>
        </div>
        <div className="copyright">Copyright © 2023 Summarist.</div>
      </footer>
    </div>
  );
}
