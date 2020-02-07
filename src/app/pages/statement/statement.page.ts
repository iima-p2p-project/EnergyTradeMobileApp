import { Component, OnInit } from '@angular/core';
import { AllTxns } from 'src/app/models/AllTxns';
import { OrderService } from 'src/app/services/order.service';
import * as moment from 'moment';
import { IonDatetime } from '@ionic/angular';
import { IngressService } from 'src/app/services/ingress.service';
import { LoadingController } from '@ionic/angular';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import * as pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
})
export class StatementPage implements OnInit {

  private fileTransfer: FileTransferObject = this.transfer.create();

  userId: any;

  fromDate: string = moment().startOf('month').toISOString();
  toDate: string = moment().endOf('month').toISOString();

  fromDateFormatted: string;
  toDateFormatted: string;

  totalEarnings: number;
  totalSpent: number;

  txnList: AllTxns[];
  txnListFromServer: any;

  txn: AllTxns={txnId: 1};

  tradeList: String[]=[];
  trade: String;

  resFromServer: any;
  response: any;

  loading: any;

  constructor(private orderService: OrderService
    , private ingressService: IngressService
    , public loadingCtrl: LoadingController
    , private file: File
    , private transfer: FileTransfer
    , private fileOpener: FileOpener) { }

  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg
    });
    return await loading.present();
  }

  ngOnInit() {
    if (this.fromDate != null) {
      this.fromDateFormatted = this.fromDate.substring(0, 10);
    }
    if (this.toDate != null) {
      this.toDateFormatted = this.toDate.substring(0, 10);
    }
    this.ingressService.getUserIdToken().then((res) => {
      this.userId = res;
      this.orderService.getAllTradeByDate(this.fromDateFormatted, this.toDateFormatted, this.userId)
        .subscribe((res) => {
          this.resFromServer = res;
          if (this.resFromServer != null) {
            this.response = this.resFromServer.response;
            if (this.response != null) {
              this.totalEarnings = this.response.totalAmountEarned;
              this.totalSpent = this.response.totalAmountSpent;
              this.txnListFromServer = this.response.trades;
            }
          }
          this.formatTradeList();
        });
    });
  }

  formatTradeList() {
    console.log('trade format: ');
    this.txnListFromServer.forEach(element => {
      this.trade=element.transactionId + " " + element.participantName
                  + " " + this.formatTime(element.transferStartTs,'d')
                  + " " + element.deviceTypeName
                  + " " + element.type
                  + " " + element.totalAmount + '\n' + '\n';
      this.tradeList.push(this.trade);            
    });

    this.tradeList.forEach(element => {
      console.log('trade : ' , element);
    })

    // this.trade="<table><tr>";
    // this.txnListFromServer.forEach(element => {
    //   this.trade += "<td>" + element.transactionId + "</td>" 
    //               + "<td>" + element.participantName + "</td>"
    //               + "<td>" + this.formatTime(element.transferStartTs,'d') + "</td>"
    //               + "<td>" + element.deviceTypeName + "</td>"
    //               + "<td>" + element.type + "</td>"
    //               + "<td>" + element.totalAmount + "</td>";
    //   this.trade += "</tr><tr>";
    //   //this.tradeList.push(this.trade);            
    // });
    // this.trade += "</tr></table>";
    this.tradeList.forEach(element => {
      console.log('trade : ' , element);
    })
  }

  formatTime(ts, type) {
    console.log('format time param : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMMM");
  }

  getFromDate() {
    if (this.fromDate != null) {
      this.fromDateFormatted = this.fromDate.substring(0, 10);
    }
    this.orderService.getAllTradeByDate(this.fromDateFormatted, this.toDateFormatted, this.userId)
      .subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          this.response = this.resFromServer.response;
          if (this.response != null) {
            this.totalEarnings = this.response.totalAmountEarned;
            this.totalSpent = this.response.totalAmountSpent;
            this.txnListFromServer = this.response.trades;
          }
        }
      });
  }

  getToDate() {
    if (this.toDate != null) {
      this.toDateFormatted = this.toDate.substring(0, 10);
    }
    this.orderService.getAllTradeByDate(this.fromDateFormatted, this.toDateFormatted, this.userId)
      .subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          this.response = this.resFromServer.response;
          if (this.response != null) {
            this.totalEarnings = this.response.totalAmountEarned;
            this.totalSpent = this.response.totalAmountSpent;
            this.txnListFromServer = this.response.trades;
          }
        }
      });
  }

  async exportPdf() {
    console.log('export button clicked');
    // //this.presentLoading('Creating PDF file...');
    // const div = document.getElementById("export");
    // const options = { background: "white", height: div.clientWidth, width: div.clientHeight };
    // domtoimage.toPng(div, options).then((dataUrl)=> {
    //   //Initialize JSPDF
    //   var doc = new jsPDF("p","mm","a4");
    //   //Add image Url to PDF
    //   doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);

    //   let pdfOutput = doc.output();
    //   // using ArrayBuffer will allow you to put image inside PDF
    //   let buffer = new ArrayBuffer(pdfOutput.length);
    //   let array = new Uint8Array(buffer);
    //   for (var i = 0; i < pdfOutput.length; i++) {
    //       array[i] = pdfOutput.charCodeAt(i);
    //   }


    //   //This is where the PDF file will stored , you can change it as you like
    //   // for more information please visit https://ionicframework.com/docs/native/file/
    //   const directory = this.file.dataDirectory ;
    //   const fileName = "invoice.pdf";
    //   let options: IWriteOptions = { replace: true };

    //   this.file.checkFile(directory, fileName).then((success)=> {
    //     //Writing File to Device
    //     this.file.writeFile(directory,fileName,buffer, options)
    //     .then((success)=> {
    //       //this.loading.dismiss();
    //       console.log("File created Succesfully" + JSON.stringify(success));
    //       this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
    //         .then(() => console.log('File is opened'))
    //         .catch(e => console.log('Error opening file', e));
    //     })
    //     .catch((error)=> {
    //       //this.loading.dismiss();
    //       console.log("Cannot Create File " +JSON.stringify(error));
    //     });
    //   })
    //   .catch((error)=> {
    //     //Writing File to Device
    //     this.file.writeFile(directory,fileName,buffer)
    //     .then((success)=> {
    //       //this.loading.dismiss();
    //       console.log("File created Succesfully" + JSON.stringify(success));
    //       this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
    //         .then(() => console.log('File is opened'))
    //         .catch(e => console.log('Error opening file', e));
    //     })
    //     .catch((error)=> {
    //       //this.loading.dismiss();
    //       console.log("Cannot Create File " +JSON.stringify(error));
    //     });
    //   });
    // })
    // .catch(function (error) {
    //   //this.loading.dismiss();
    //   console.error('oops, something went wrong!', error);
    // });

    var doc = new jsPDF()

    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')

    this.download(doc);
  }

  // download(name) { //name : any file name
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   const url = yourserverul + name;
  //   fileTransfer.download(url, this.filePlug.dataDirectory + name).then((entry) => {
  //     this.fileOpener.open(entry.toURL(), this.getMimeByExt(name))
  //       .then(() => console.log('File is opened'))
  //       .catch(e => console.log('Error opening file', e));
  //   }, (error) => {
  //     console.log(error);

  //   });
  // }

  //   public download(fileName, filePath) {  
  //     //here encoding path as encodeURI() format.  
  //     let url = encodeURI(filePath);  
  //     //here initializing object.  
  //     this.fileTransfer = this.transfer.download(url, this.file.externalRootDirectory + fileName
  //       , true,);  
  //     // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
  //     this.transfer.download(url, this.file.externalRootDirectory + fileName
  //       , this.successCallBack(), this.errorCallBack(error), true, null).then((entry) => {  
  //         //here logging our success downloaded file path in mobile.  
  //         console.log('download completed: ' + entry.toURL());  
  //     }, (error) => {  
  //         //here logging our error its easier to find out what type of error occured.  
  //         console.log('download failed: ' + error);  
  //     });  
  // } 
  download(doc) {
    console.log('download');  
    const url = 'a4.pdf';
    this.fileTransfer.download(doc, this.file.dataDirectory + 'a4.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  pdfObj = null;
  obj:any;
  //content = ["test1", "test2", "test3", "test4"];

  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  createPdf() {
    console.log("CreatePdf() triggered")
    var docDefinition = {
      content: [
        { text: 'ENERGY TRADE STATEMENT', style: 'header' },
        // { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.fromDateFormatted },
 
        { text: 'To', style: 'subheader' },
        { text: this.toDateFormatted },
 
        { text: " ", style: 'story', margin: [0, 0, 0, 20] },
        { text: " ", style: 'story', margin: [0, 0, 0, 20] },
        { text: this.tradeList, style: 'story', margin: [0, 0, 0, 20] },
 
        // {
        //   ul: [
        //     'Bacon',
        //     'Rips',
        //     'BBQ',
        //   ]
        // }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'left',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfmake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    console.log("DownloadPdf() triggered")
    //if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'statement.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'statement.pdf', 'application/pdf');
        })
      });
    //} else {
      // On a browser simply use download!
      //this.pdfObj.download();
    //}
  }
}
