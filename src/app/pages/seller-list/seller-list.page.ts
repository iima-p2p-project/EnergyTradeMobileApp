import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.page.html',
  styleUrls: ['./seller-list.page.scss'],
})
export class SellerListPage implements OnInit {

  constructor(
    public alert:AlertController
  ) { }

  ngOnInit() {
  }

  async sortPageBtn()
  {
    let abc=await this.alert.create({
      header: 'Sort by',
      inputs: [
        {
          name: 'Dates',
          type: 'radio',
          label: 'Dates',
          value: 'dates',
          checked: true
        },
        {
          name: 'Units',
          type: 'radio',
          label: 'Units',
          value: 'units'
        },
        {
          name: 'Location',
          type: 'radio',
          label: 'Locations',
          value: 'locations'
        },
        {
          name: 'Per Unit',
          type: 'radio',
          label: 'Per Unit',
          value: 'perunit'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: val => {
            console.log('Confirm Ok',val);
            // Execute the sorting here, value returned is val
          }
        }
      ]
    })

    await abc.present();
  }

  async filterPageBtn()
  {
    let abc=await this.alert.create({
      header: 'Checkbox',
      inputs: [
        {
          name: 'Less than 25 units',
          type: 'checkbox',
          label: 'Less than 25 units',
          value: 'lessthan25',
          checked: true
        },
        {
          name: '25 units to 100 units',
          type: 'checkbox',
          label: '25 units to 100 units',
          value: '25to100',
          checked: true
        },

        {
          name: 'More than 100 units',
          type: 'checkbox',
          label: 'More than 100',
          value: 'morethan100',
          checked: true
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: val => {
            console.log('Confirm Ok',val);
            // Execute the filter here, value returned is val. 
            // Note that val is returned as an array
          }
        }
      ]
    })

    await abc.present();
  }

}
