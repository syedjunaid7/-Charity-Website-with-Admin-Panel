import "./styles.scss";
import banner from "../../../assets/images/banner.jpeg";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function Hero({ handlePayment }) {
  const [toggleData, setToggleData] = useState(false);
  const toggleMore = () => {
    setToggleData(!toggleData);
  };
  useEffect(() => {
    if (toggleData) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [toggleData]);
  return (
    <section className="hero-section">
      <div className="max-width hero-inner">
        <div style={{ width: "fit-content" }}>
          <div className="content" onClick={toggleMore}>
            <p>
              Imaging the piercing cold of a winter night without a blanket to
              shield you. For countless individual on the street of India, this
              is the reality.your kindness can change that. Your donation of a
              blanket isn't just warmth; it's a lifeline. It's the hope that
              someone, somewhere, cares. It's a great way of helping out the ...
              <button>ReadMore</button>
            </p>
          </div>
          <button style={{ margin: "1.6rem 0" }} onClick={handlePayment}>
            Donate Now
          </button>
        </div>
      </div>
      {toggleData && (
        <div className="blur-effect">
          <div className="content-more">
            <RxCross2 className="icon" onClick={toggleMore} />
            <p>
              Imaging the piercing cold of a winter night without a blanket to
              shield you. For countless individual on the street of India, this
              is the reality.your kindness can change that. Your donation of a
              blanket isn't just warmth; it's a lifeline. It's the hope that
              someone, somewhere, cares. It's a great way of helping out the
              community. Donating a blanket can make a great difference
              especially homeless who cannot afford even a blanket and can die.
            </p>
            <p>
              {" "}
              #Ek kambal Pyar bhara aim to spread love care comfort and
              protection from blanket to the unreserve population who lost his
              life on this Harsh condition of winter. Several death are reported
              early due to this Harsh winter of India by denoting blanket you
              can express your care toward them and feel safe to them.
            </p>
            <p>
              {" "}
              BCF have started denoting blanket in various geographical location
              you can be a part of this initiative too! our mission is simple
              yet profound: to extend a helping hand to those in need offering
              support sustenance and opportunities for a brighter future with a
              steadfast commitment to make a meaningful difference in the life
              of the less fortunate, our Foundation tirelessly work toward
              alleviating poverty, education health care and essential resources
              to build stronger communities.
            </p>
            <p>
              There is no better gift then providing blanket to the needy during
              winter. your donation can save a child life and can protect
              women's dignity and make a huge difference in the life of people.
              Join us in our journey of kindness and empowerment as we strive to
              create a world where every individual has the change to thrive and
              flourish BFC buy a blanket and provide warmth. Our journey is
              impossible without your support.
            </p>
            <p>
              {" "}
              Consider denoting a minimum of Rs./-100 per blanket it is spread a
              little warm to the unfortunate. you donation could be the one that
              save a life. you can donate in multiple of Rs./-100 depending on
              how many people you wish to support and save life.join us in our
              heart felt mission to bring warm and comfort to the homeless and
              needy. individual your contribution can make an immediate
              difference in shielding these vulnerable souls from the biting
              cold. With your support we can provide essential blankets to those
              without shelter offering them a sense of relief and protecting
              during the harsh winter night let's you night in kindness and
              generosity donate a blanket today and help us bring solace and
              warmth to those who need it the most
            </p>
            <h4>Warmth and hope:- blanket donation initiative</h4>
          </div>
        </div>
      )}
    </section>
  );
}
