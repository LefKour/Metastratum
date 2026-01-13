const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed text-sm md:text-md flex bottom-0 justify-center items-center w-full py-2">
      © {currentYear}, Eleftherios Kourkopoulos - All rights reserved
      </div>
  );
};

export default Footer;