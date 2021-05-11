import React, { Component } from "react";
var  abc = {
    action:['increase','decrease','set','reset','make','turn','move','start','stop','open','close'],
    property:['direction','switch','power','speed','brightness','state','volume','temperature','swing','height','zoom','pan','tilt','samplingrate','automaticgaincorrection','lowpassfilter'],
    appliance:['fan','light','AC','refrigerator','exhaustfan','television','tv','celingfan','airconditioner','frontdoorlock'],
    location:['kitchen','hall','garden','room','studyroom','utility','drawingroom','livingroom','workroom','basementbedroom','secondfloorbedroomwindow','garageshutterdoor','firstfloormaindoor','firstfloorbedroomdoor'],
    property_value:['on','off','low','min','max','medium','high','up','down','left','right','verylow','veryhigh','tennmilliseconds','thirtydegreecelcius'],
    property_units:['celcius','farenheit','kg','pounds','grams','milligrams','kilometers','miles','degree']
    
 
}
var stopwords = ['the','it','of','and','feel','for','me','you','there','here','very','good','bad','they','so','extreemly','fine',
'a', 'about', 'after', 'all', 'also',' always',' am',' an',  'any', 'are', 'at', 'be', 'been', 'being', 'but', 'by', 'came' ,'can', 'cant' ,'come', 
'could' ,'did' ,'didnt' ,'do' ,'does', 'doesnt', 'doing', 'dont ','else' , 'from', 'get', 'give', 'goes', 'going', 'had', 'happen' ,
'has', 'have' ,'having' ,'how', 'i' ,'if', 'ill' ,'im','in', 'into', 'is', 'isnt', 'it' ,'its', 'just', 'keep' ,'let' ,'like', 'made', 'make' ,
'many', 'may', 'mean', 'more', 'most', 'much', 'no', 'not', 'now', 'only', 'or' ,'our', 'really' ,'say' ,'see', 'some', 'something', 
'take', 'tell', 'than', 'that', 'the', 'their', 'them' ,'then',  'thing', 'this', 'to', 'try', 'up', 'us', 'use', 'used', 'uses', 
'want', 'was', 'way', 'we', 'what' ,'when' ,'where', 'which' ,'who' ,'why' ,'will', 'with', 'without', 'wont' ,'your', 'youre','amount', 'fashion',
 'picture','area', 'feeling', 'process','aspect', 'field' ,'rate','attitude' ,'level', 'realm','basis', 'manner' ,'respect','case' ,'means' ,'role',
'degree', 'nature' ,'scope','experience' ,'order','situation','fact', 'part', 'state','factor', 'period' ,'type',
'accomplish', 'have','achieve', 'make','be', 'occur','bring', 'about', 'provide',
'cause', 'result','do','serve','exercise', 'take', 'place','give'];



var action='none', property='none',appliance='none',location=prevlocation,property_value='none';

var  retarry = {
  count:0,
  action:"none",
  property:"none",
  appliance:"none",
  location:"none",
  property_value:"none",
  property_units:"none"
 
}
var prevlocation = "none"
var twowrd=[];
var threewrd=[];
var fourwrd=[];
var fivewrd=[];
var res=[];
var var2 =  JSON.stringify(abc);
var count=0; 




var RNFS = require ('react-native-fs');

const compareString  = (e)=>{
  
  //var wrd="";
  var ret=[];
  retarry.count=0;
  var foundsw=0;
  e.value.forEach (com_str=>{
    var i=0; count=0;var j=0;
    com_str = com_str.toLowerCase();
    ret = com_str.split(" "); 
    for (i=0;i<ret.length;i++)
      { foundsw=0;
        for (k = 1;k<stopwords.length;k++)         { if (new RegExp("\\b"+stopwords[k]+"\\b").test(ret[i])) foundsw=1;}
        if(foundsw!=1){res[j]=ret[i];j++;} 
      }   //if (stopwords.includes(ret[i])!=true){res[j]=ret[i];j++;} 
      
    console.log ("com_str=",com_str);    console.log("resvalue=",res);
    for(i=1;i<res.length;i++)     {twowrd[i-1]=res[i-1].concat(res[i]);}//console.log(twowrd);
    for(i=2;i<res.length;i++)     {threewrd[i]=res[i-2].concat(res[i-1]);threewrd[i]=threewrd[i].concat(res[i]);}//console.log(threewrd);
    for(i=3;i<res.length;i++)     {fourwrd[i]=res[i-3].concat(res[i-2]).concat(res[i-1]).concat(res[i]);}//console.log(fourwrd);
    for(i=4;i<res.length;i++)     {fivewrd[i]=res[i-4].concat(res[i-3]).concat(res[i-2]).concat(res[i-1]).concat(res[i]);}//console.log(fivewrd);
    location=match(abc.location);    
    action=match(abc.action);   // console.log(action);
    property=match(abc.property);   // console.log(property);
    property_value=match(abc.property_value);   // console.log(property_value);
    appliance=match(abc.appliance); //console.log(appliance)
    property_units=match(abc.property_units);   // console.log(property_units);
    console.log("oldcount=",retarry.count,"count=",count)
    if (retarry.count<=count) 
    { retarry.action=action;retarry.property=property;retarry.appliance=appliance;retarry.location=location;
      retarry.property_value=property_value;retarry.property_units=property_units;retarry.count=count; 
    }
    console.log('location=',retarry.location,'action=',retarry.action,'property=',retarry.propert,'property_value=',retarry.property_value);
   console.log('appliance=',retarry.appliance,'property_units=',retarry.property_units,'count=',retarry.count);
   });
   console.log('final location=',retarry.location);
   console.log('final action=',retarry.action);
   console.log('final property=',retarry.property);
   console.log('final property_value=',retarry.property_value);
   console.log('final appliance=',retarry.appliance);
   console.log('final property_units=',retarry.property_units);
   console.log('final count=',retarry.count);

 }

 const match=(checklist)=>{
   var found=0;var wrd = "null";
    for(i=0;i<fivewrd.length;i++) { if(found!=0) break; if(checklist.includes(fivewrd[i])==true) {found=1;wrd=fivewrd[i];fivewrd[i]="-";count+=1;}}
    if(found==0)  {for(i=0;i<fourwrd.length;i++){if(found!=0) break;if((checklist.includes(fourwrd[i])==true)) {found=1;wrd=fourwrd[i];fourwrd[i]="-";count+=1;}}}
    if(found==0)  {for(i=0;i<threewrd.length;i++){if(found!=0)break;if(checklist.includes(threewrd[i])==true) {found=1;wrd=threewrd[i];threewrd[i]="-";count+=1;}}}
    if(found==0)  {for(i=0;i<twowrd.length;i++)  {if(found!=0)break;if((checklist.includes(twowrd[i])==true)){found=1;wrd=twowrd[i];twowrd[i]="-";count+=1;}}}
    if(found==0)  {for(i=0;i<res.length;i++){if(found!=0) break;if(checklist.includes(res[i])==true) {wrd=res[i];res[i]="-";count+=1;}}}
    return wrd
 }
class Files extends Component {

  
 
 // 
 //}
 
  render() 
  {
    var path = RNFS.ExternalDirectoryPath + '/test1.json' ;  //+ '/test1.json'
      // write the file
       
        RNFS.writeFile(path, var2 , 'utf8')
          .then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
         /*
          //delete the file 
           RNFS.unlink(path)
          .then(() => {
            console.log('FILE DELETED');
          })}
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch((err) => {
            console.log(err.message);
          });
          */
        
        
  ///////////////////////////////////////////////////////////////////////////////////////////

        RNFS.readDir(RNFS.ExternalDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
          console.log('FILES_STORED_IN_LOCAL_DIRECTORY -->>', result);

          // stat the first file
          return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
          }

          return 'no file';
        })
        .then( (contents) => {
          // log the file contents
          console.log('content inside the file',contents);
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
      }
 
    }
  
export {Files, compareString};

//export const process = new File;

  

  
    


      
  

  
    
