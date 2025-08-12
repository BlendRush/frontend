
//Landing Page 
import NavBar from "../Component/NavBar";
import homeBg from "../assets/home-bg.png";

export default function HomePage() {
  return (
    <>
      <NavBar />

      {/* Background section */}
      <div
        className="relative  min-h-screen bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-white/20" aria-hidden="true" />

        

          {/* Order Now Button */}
          <button
            className="mt-6 px-6 py-3 rounded-full bg-green-700 text-white font-semibold text-lg shadow-md hover:bg-green-400 transition"
            style={{ fontFamily: "Merienda, cursive" }}
          >
            Order Now
          </button>
        </div>
      
    </>
  );
}
