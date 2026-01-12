const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed flex bottom-0 justify-center items-center w-full">
      © {currentYear}, Eleftherios Kourkopoulos - All rights reserved
      </div>
  );
};

export default Footer;