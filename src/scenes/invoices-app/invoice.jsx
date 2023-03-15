import React from 'react';
import { IconName } from 'react-icons/fa';
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import "./invoice.css"



// Detect the current mode (light or dark) and add the appropriate class to the body

function invoice() {
  return(
    <div className="main-page-payments">
  <div className="main-payments">
    {/* FIRST SECTION  */}
   <div className="all-invoice-payments">
    <h2 className="first-title-payment">all-invoice-payments <button class="plus-button"></button>
</h2>
<div className="all-invoice-flex">
  <div className="first-column-all-invoice all-column">
    <div className="client-invoice-number">client-invoice-number</div>
    <div className="company-all-invoice">company-all-invoice</div>
  </div>
  <div className="second-column-all-invoice all-column">
   <div className="payment-date">payment-date</div>
    <div className="day-month-year">20/01/2023</div>
  </div>
  <div className="third-column-all-invoice all-column">
   <div className="type-description">type-description</div>
    <div className="logistics">logistics</div>
  </div>
  <div className="fourth-column-all-invoice all-column">
   <div className="amout-status">amout-status</div>
    <div className="number-ammout">number-ammout</div>
  </div>
  </div>
  </div>
  
  {/* SECOND SECTION */}


  


 
   <div className="other-income-payments">
   <h2 className="first-title-payment">all-invoice-payments <button class="plus-button"></button>
</h2>
<div className="all-invoice-flex">
  <div className="first-column-all-invoice all-column">
    <div className="client-invoice-number">client-invoice-number</div>
    <div className="company-all-invoice">company-all-invoice</div>
  </div>
  <div className="second-column-all-invoice all-column">
   <div className="payment-date">payment-date</div>
    <div className="day-month-year">20/01/2023</div>
  </div>
  <div className="third-column-all-invoice all-column">
   <div className="type-description">type-description</div>
    <div className="logistics">logistics</div>
  </div>
  <div className="fourth-column-all-invoice all-column">
   <div className="amout-status">amout-status</div>
    <div className="number-ammout">number-ammout</div>
  </div>
  </div>
   
   
   
   </div>

   </div>
   </div>
   );
}

export default invoice
