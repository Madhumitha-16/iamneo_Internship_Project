import React from 'react'
function Logo(){
    const logo = (
        <img
          //src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          src="../src/images/keep.png"
          alt="logo"
        />
      );
    
      return (
        <div className="header">
          {logo}
        </div>
      );

    
   }
export default Logo;