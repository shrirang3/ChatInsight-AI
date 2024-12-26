import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function CoverPg() {
  return (
    <div className="bg-[#EEF4FF] min-h-screen relative w-full text-black">
      <Nav />
      <Header />
    </div>
  );
}

const Nav = () => {
  const navData = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="absolute top-0 z-50 w-full py-3 text-xl font-bold drop-shadow-xl flex-none transition-colors duration-500">
      <div className="px-4 flex justify-around">
        <div>
          <h1 className="font-jostBold text-4xl text-[#3E3FD8]">ChatInsight AI</h1>
        </div>
        <div className="sm:flex justify-around hidden">
          {navData.map((n, index) => (
            <a href={n.href} key={index}>
              <h1 className="mx-4 font-jostRegular text-2xl">{n.name}</h1>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleGetStarted = () => {
    navigate('/chat'); // Navigate to /chat route when the button is clicked
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <div className="max-w-xl text-black text-center">
        <h1 className="font-jostBold text-[58px] leading-[50px] sm:text-7xl">
          Leverages AI for seamless insights
        </h1>
        <p className="font-jostRegular text-xl py-10 text-gray-600">
          Conversations Beyond Limits – Your AI Companion for Videos, PDFs, and Docs!{' '}
        </p>
        <div className="flex justify-center items-center flex-wrap">
          <button
            className="bg-[#3E3FD8] mr-4 flex text-white font-jostMedium w-[170px] h-[60px] rounded-3xl text-xl items-center justify-center"
            onClick={handleGetStarted} // On click, call handleGetStarted
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="relative h-full">
        <div className="absolute -top-10 h-full">
          <svg
            width="1100"
            height="808"
            viewBox="0 0 1100 808"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="216" width="884" height="808" rx="60" fill="#3E3FD8" fillOpacity="0.75" />
            <rect y="132" width="501" height="514" rx="60" fill="#EF8B8D" fillOpacity="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
};
