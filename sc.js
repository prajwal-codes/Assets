/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const { Contract } = require('fabric-contract-api');

//creating a function class BikeTransfer and inheriting it via contracts

class BikeTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
                {
                    ID: '0001',
                    Bike: 'Yamaha RX100',
                    CC: '95cc',
                    Owner: 'null',
                    Price: 300000,
                },
                {
                    ID: '0002',
                    Bike: 'KTM',
                    CC: '300cc',
                    Owner: 'null',
                    Price: 150000,
                },
                {
                    ID: '0005',
                    Bike: 'Kawasaki Ninja',
                    CC: '250cc',
                    Owner: 'null',
                    Price: 300000,
                },
                {
                    ID: '0003',
                    Bike: 'Chetak EV',
                    CC: '180cc',
                    Owner: 'null',
                    Price: 120000,
                },
                {
                    ID: '0004',
                    Bike: 'OLA EV',
                    CC: '170cc',
                    Owner: 'null',
                    Price: 80000,
                },
        ];
        for (const bike of bikes) {
            bike.docType = 'bike';
            await ctx.stub.putState(bike.ID, Buffer.from(JSON.stringify(bike)));
            console.info(`Bike ${bike.ID} initialized`);
        }
    }
    //CreateBike issues a new asset to thw world state with given details.
    async CreateBike( ctx,id,bike,cc,owner,price)
    {
        const bike ={
            ID: id,
            Bike: bike,
            CC: cc,
            Owner: owner,
            Price: price,
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(bike)));
        return JSON.stringify(bike);
    }

    // ReadBike returns the asset stored in the world state with given details.

    async ReadBike(ctx, id) {
        const bikeJSON = await ctx.stub.getState(id); //get the asset from chaincode state
        if (!bikeJSON || bikeJSON.length === 0){
            throw new Error(`The bike ${id} doesnt exist`);
        
        }
        return bikeJSON.toString();
    }
    // UpdateBike updates an existing bike in the world state with provided parameters.
    async UpdateBike(ctx, id,bike, cc, owner, price) {
        const exists = await this.BikeExists(ctx, id);
        if (!exists) {
            throw new Error(`The bike ${id} does not exist`);
        }

         // overwriting original bike with new bike
         const updatedBike = {
            ID: id,
            Bike: bike,
            CC: cc,
            Owner: owner,
            Price: price,
        };
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedBike)));
    }
  
      // DeleteBike deletes an given bike from the world state.
      async DeleteBike(ctx, id) {
        const exists = await this.BikeExists(ctx, id);
        if (!exists) {
            throw new Error(`The bike ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }
    // BikeExists returns true when bike with given ID exists in world state.
    async BikeExists(ctx, id) {
        const bikeJSON = await ctx.stub.getState(id);
        return bikeJSON && bikeJSON.length > 0;
    }

    // TransferBike updates the owner field of bike with given id in the world state.
    async TransferBike(ctx, id, newOwner) {
        const bikeString = await this.ReadBike(ctx, id);
        const bike = JSON.parse(bikeString);
        bike.Owner = newOwner;
        return ctx.stub.putState(id, Buffer.from(JSON.stringify(bike)));
    }

    // GetAllBikes returns all assets found in the world state.
    async GetAllBikes(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }


}

module.exports = BikeTransfer;
