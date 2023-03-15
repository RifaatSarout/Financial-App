import React from 'react'
import { IconName } from 'react-icons/fa';
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import "./incomeapp.css"

function invoiceapp() {
  return (
    <div className="main-cointainer-analytic">
    {/* FIRST CARD  */}
    <div className="analytic ">
      <div className="design">
        <div className="logo">
          <BsCreditCard />
        </div>
        <div className="action">
          <AiOutlineMore />
        </div>
      </div>
      <div className="transfer">
        <h6>income</h6>
        <h6>open invoices</h6>
        <h6>open invoices</h6>
      </div>
      <div className="money">
        <h5>$1200</h5>
      </div>
    </div>
    {/* SECOND CARD */}
    <div className="analytic ">
      <div className="design">
        <div className="logo">
          <BiTransfer />
        </div>
        <div className="action">
          <AiOutlineMore />
        </div>
      </div>
      <div className="transfer">
        <h6>Profit and loss </h6>
        <h6>Net income</h6>
      </div>
      <div className="money">
        <h5>$1200</h5>
      </div>
    </div>
   {/* THIRD CARD */}
    <div className="analytic ">
      <div className="design">
        <div className="logo">
          <GiTakeMyMoney />
        </div>
        <div className="action">
          <AiOutlineMore />
        </div>
      </div>
      <div className="transfer">
        <h6>Sales </h6>
        <h6>Past 30 days</h6>
      </div>
      <div className="money">
        <h5>$1500</h5>
      </div>
    </div>
  </div>
 
);
}

export default invoiceapp

