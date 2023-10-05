const express = require("express")
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const axios = require('axios');
const cors = require('cors');
const app = express()

app.use(
    bodyParser.text({
      type: ['text/xml', 'application/xml'],
    })
  );

dotenv.config();

const PORT = process.env.PORT || 2000;
app.use(cors());

app.listen(PORT, ()=> {
    console.log("Express API running in port:" + PORT)
})

app.get("/api", (req, res) => {
    res.send('Hello World')
})

app.get('/clik', (req, res) => {
    axios.get('https://a2a-cbsnusantara.cbclik.com/Service.svc?singleWsdl')
    .then(response => {
        res.type('application/xml');
        res.send(response.data);
      })
      .catch(error => {
        console.error('Error calling third-party API:', error);
        res.status(500).send('Internal Server Error');
      });
  });

app.post('/clik', (req, res) => {
const xmlData = req.body;
axios.post('https://a2a-cbsnusantara.cbclik.com/Service.svc?singleWsdl', xmlData, {
    headers: {
    'Content-Type': 'text/xml',
    'SOAPAction': 'https://a2a-cbsnusantara.cbclik.com/Service.svc?singleWsdl/POST'
    },
})
.then(response => {
    res.send(response.data);
})
.catch(error => {
    console.error('Error', error);
});
});

// const xmlData = `<soapenv:Envelope xmlns:urn="urn:cbs-messagegatewaysoap:2015-01-01" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
// <soapenv:Header/>
// <soapenv:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//    <urn:MGRequest>
//       <urn:Message Idempotence="unique" TimeStamp="2018-11-26T14:42:47.662197+01:00" Id="767676" GroupId="55657" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
//          <urn:Credential Id="LYGO4770" Password="-@6hKQ1?xu" Domain=""/>
//       </urn:Message>
//       <urn:Product Id="CB_ME_Product" Version="" ServiceId="CBG" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
//          <cb:CB_ME_ProductInput xmlns:cb="urn:crif-creditbureau:v1">
//             <cb:Subject>
//                <cb:Individual DebtorGroupCodeInd="S14" Gender="P" MarriageStatus="2" EducationalStatusCode="04">
//                   <cb:IndividualName NameAsId="ROSA UTARI" FullName="ROSA UTARI" MothersName="" />
//            <cb:BirthData BirthDate="1995-08-15" BirthPlace="Bandung" />
//                   <cb:Address Address="JL KYAI HAJI BASRI" SubDistrict="" District="" City="" PostalCode="" Country=""/>
//          <cb:IdentificationCode IdentityType="1" IdentityNumber="3179895738878787" />
//                   <cb:ID NPWP=""/>
//                   <cb:Contact PhoneNumber="" CellphoneNumber="0898553289" EmailAddress=""/>
//                </cb:Individual>
//             </cb:Subject>
//             <cb:Purpose PurposeCode="10"/>
//          </cb:CB_ME_ProductInput>
//       </urn:Product>
//    </urn:MGRequest>
// </soapenv:Body>
// </soapenv:Envelope>`