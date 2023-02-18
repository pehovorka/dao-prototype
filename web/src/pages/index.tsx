import { SEO } from "@/components/layout/SEO";

export default function Home() {
  return (
    <>
      <SEO title="Home" />
      <div className="hero bg-base-200 py-20 px-10 rounded-2xl">
        <div className="hero-content">
          <div>
            <h1 className="text-5xl font-bold">
              Revolutionize Your Homeowners Association with Homeowners DAO
            </h1>
            <p className="py-6">
              Join Homeowners DAO, the future of homeowners associations. Our
              decentralized platform empowers homeowners to collaborate, make
              decisions and take action on community projects and improvements.
              Our transparent governance model makes it easy to connect and make
              an impact on the place you call home.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
