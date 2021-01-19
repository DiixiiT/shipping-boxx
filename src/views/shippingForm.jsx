import React, { useState } from 'react';
import { MDBCard, MDBCol, MDBRow,MDBBtn } from 'mdbreact';
import axios from 'axios';
import '../css/order.css'
 
 

function ShippingForm() {
  const [name,setName]=useState("");
  const [weigth,setWeight]=useState("1");
  const [color,setColor]=useState("#ffffff");
  const [country,setCountry]=useState("swedan");

  const formstyle={
    width: "500px",
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    padding: "10px 0px 0px 50px",
    boxShadow:"20px solid black"
  
  };

  const columnStyle={
   width:"350px",
    textAlign:"left"
  }

  const submitHandler=async(event)=>{
    event.preventDefault();
    if(name ==="" || weigth === "" || country === "" ||color === ""){
      alert('please');
      return;
    }
    event.target.className="was-validated";

    const currency={
      swedan:11.42,
      China:8.71,
      Australia:1.83,
      Brazil:7.43,
    }

    const coast=(currency[country] * weigth).toFixed(2);

    const orders={
      name:name,
      Weight:weigth,
      Color:color,
      Country:country,
      coast:coast,
    }

     try{
       await axios.post("http://localhost:5000/create",orders);
       alert('order placed succesfully');
     }catch(err){
       alert('Erron in placing order');
     }

  }
    return (
        <div>
  <MDBCard style={formstyle} id="head">
  <MDBRow>
    <MDBCol md="6" style={columnStyle}>
      <form className="needs-validation"  noValidate onSubmit={submitHandler} >
        <MDBRow>
            <MDBCol md="12" className="md-3" style={columnStyle}>
              <label>Name</label>
              <input
                type="text" className="form-control" onChange={(event) => setName(event.target.value)}
                required
                id="name" value={name} style={columnStyle}
              />
            </MDBCol>
            <MDBCol md="12" className="mb-3">
            <lable>Weight(kg)</lable>
            <input type="number" className="form-control" onChange={(event)=>setWeight(event.target.value)}
            required id="weigth" value={weigth} min="0" style={columnStyle}/>

            </MDBCol>
            <MDBCol md="12" className="md-3" >
                <label>Color</label>
                <input type="color" className="form-color" onChange={(event)=>setColor(event.target.value)}
                required id="color" value={color} style={columnStyle} />
            </MDBCol>
            <MDBCol md="12" className="mb-3">
              <label>Destination Country</label>
              <select
                className="browser-default custom-select"
                onChange={(event) => setCountry(event.target.value)}
                required
                value={country} style={columnStyle}
              >
                <option value="Sweden" default>
                  Sweden
                </option>
                <option value="China">China</option>
                <option value="Brazil">Brazil</option>
                <option value="Australia">Australia</option>
              </select>
            </MDBCol>
            <MDBCol md="12" className="mb-3">
              <MDBBtn color="indigo" type="submit">
                Save
              </MDBBtn>
            </MDBCol>
        </MDBRow>
      </form>
    </MDBCol>
  </MDBRow>
</MDBCard>
        </div>
    )
}

export default ShippingForm
