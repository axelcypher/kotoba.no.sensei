import { Injectable } from '@angular/core';
import { createRxDatabase, addRxPlugin  } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';


   @Injectable({
     providedIn: 'root'
   })
   export class DatabaseService {

   
     constructor() {
       this.initDatabase();
     }
   
     async initDatabase() {
       
      const db = await createRxDatabase({
        name: 'heroesdb',                   // <- name
        storage: getRxStorageDexie(),       // <- RxStorage
      
        /* Optional parameters: */
        password: 'myPassword',             // <- password (optional)
        multiInstance: true,                // <- multiInstance (optional, default: true)
        eventReduce: true,                  // <- eventReduce (optional, default: false)
        cleanupPolicy: {}                   // <- custom cleanup policy (optional) 
      });

     
      const vocabSchema = {
        version: 1,
        primaryKey: 'keyphrase',
        type: 'object',
        properties: {
            keyphrase: {
              type: 'string',
              maxLength: 100 // <- the primary key must have set maxLength
            },
            data: [
              {
              kana: {
                type: 'string'
              },
              sound: {
                type: 'string'
              },
              romanji: {
                type: 'string'
              },
              translated: {
                type: 'string'
              },
              chapter: {
                type: 'number'
              },
              number: {
                type: 'number'
              },
              progress: {
                rank: {
                  type: 'number'
                },
                points: {
                  type: 'number'
                },
                correct: {
                  type: 'number'
                },
                incorrect: {
                  type: 'number'
                },
                lastActivity: {
                  type: 'string',
                  format: 'date-time'
                },
                lastRankUp: {
                  type: 'string',
                  format: 'date-time'
                },
              }
            }],
            timestamp: {
              type: 'string',
              format: 'date-time'
            },
        },
        required: ['keyphrase', 'data']
      }

   

      await db.addCollections({
        todos: {
          schema: vocabSchema
        }
      });


     }
   
     // Methode, um auf die Datenbank zuzugreifen
     get db() {
       return this.dbPromise;
     }
   }