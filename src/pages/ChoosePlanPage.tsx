import { BookOpenText, Check, ChevronDown, Lightbulb, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const faqs = [
  ["How does the free 7-day trial work?", "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."],
  ["Can I switch subscriptions from monthly to yearly, or yearly to monthly?", "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."],
  ["What's included in the Premium plan?", "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books, high-quality audio, offline reading, and precise recommendations curated by experts."],
  ["Can I cancel during my trial or subscription?", "You will not be charged if you cancel your trial before its conclusion. After cancelling, you can still expand your knowledge with one curated free book per day."],
];

export function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");
  const [openFaq, setOpenFaq] = useState(0);
  const { user, openAuth, setPlan } = useAuth();
  const navigate = useNavigate();

  const subscribe = () => {
    if (!user) {
      openAuth("login");
      return;
    }
    setPlan(selectedPlan === "yearly" ? "premium-plus" : "premium");
    navigate("/settings");
  };

  return (
    <div className="plan-page">
      <header className="plan-hero">
        <div className="plan-hero-inner">
          <div className="plan-copy">
            <h1>Get unlimited access to many amazing books to read</h1>
            <p>Turn ordinary moments into amazing learning opportunities</p>
            <img src={`${import.meta.env.BASE_URL}assets/pricing-top.png`} alt="A person learning with Summarist" />
          </div>
          <div className="plan-benefits">
            <div><BookOpenText /><span>Key ideas in few min with many books to read</span></div>
            <div><Users /><span>3 million people growing with Summarist everyday</span></div>
            <div><Lightbulb /><span>Precise recommendations collections curated by experts</span></div>
          </div>
        </div>
      </header>

      <main className="plan-main">
        <h2>Choose the plan that fits you</h2>
        <button className={`plan-option ${selectedPlan === "yearly" ? "selected" : ""}`} onClick={() => setSelectedPlan("yearly")}>
          <span className="radio-dot" />
          <span><strong>Premium Plus Yearly</strong><small>$99.99/year</small></span>
          <em>7-day free trial included</em>
        </button>
        <div className="plan-or">or</div>
        <button className={`plan-option ${selectedPlan === "monthly" ? "selected" : ""}`} onClick={() => setSelectedPlan("monthly")}>
          <span className="radio-dot" />
          <span><strong>Premium Monthly</strong><small>$9.99/month</small></span>
          <em>No trial included</em>
        </button>
        <button className="primary-button subscribe-button" onClick={subscribe}>
          {selectedPlan === "yearly" ? "Start your free 7-day trial" : "Start your first month"}
        </button>
        <p className="trial-note"><Check size={18} />Cancel your trial at any time before it ends, and you won’t be charged.</p>

        <section className="faq-section">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                <span>{question}</span><ChevronDown />
              </button>
              {openFaq === index && <p>{answer}</p>}
            </div>
          ))}
        </section>
      </main>

      <footer className="home-footer compact-footer">
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
