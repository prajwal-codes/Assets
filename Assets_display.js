
    // const assets =
    //   {
    //     Company: "Siemens",
    //     Empid: "000101",
    //     Name: "Jim",
    //     Position: "CEO",
    //     Experience: "6 yrs",
    //     Amount : "10000"

    //   }
      // {
      //   Company: "Deloitte",
      //   Empid: "000092",
      //   Name: "Kim",
      //   Position: "HR",
      //   Experience: "3 yrs",
      //   Amount : "100000"
      // },
      // {
      //   Company: "Capgemini",
      //   Empid: "000081",
      //   Name: "Tim",
      //   Position: "Employee",
      //   Experience: "2 yrs",
      //   Amount : "20000"
      // },
      // {
      //   Company: "Cybage",
      //   Empid: "000054",
      //   Name: "Stim",
      //   Position: "Senior Manager",
      //   Experience: "4 yrs",
      //   Amount : "150000"
      // },
    // ];

    // console.log(assets);



    // function transferAsset(amount){

    //   assets.Amount =amount;
    //   console.log(amount);

    // }

    // transferAsset(9000000);

    
       
//     function functionOne(){
//       const assets = {'name' : 'pk'};
//       console.log(assets)

//       function functionTwo(Name){
//       assets.name = Name;
//         console.log(assets)

//       }
//       functionTwo('bablu')
//     }
// functionOne()
   
function placeOrder(callback) {
  setTimeout(() => {
    const orderID = "001";
    callback(orderID);
  }, 4000);
}

placeOrder(function(orderID) {
  setTimeout(() => {
    console.log("Order placed successfully with order ID = ${orderID}.");
  }, 2000);
});