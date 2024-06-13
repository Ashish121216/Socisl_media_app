import {Client, Account, Databases, Storage , Avatars} from "appwrite";

export const appwriteConfig = {
    projectId : '657eebee47b7d687dd0b',
    url:'https://cloud.appwrite.io/v1',
    databaseId: '6580833f68b8be96b6f7',
    storageId: '658082f9bb9d4f8c9278',
    userCollectionId:'658083e5063d95f8435b',
    postCollectionId: '658083bd032eb553b0a3',
    savesCollectionId: '65808405736b21cd8470'
}

export const client = new Client();

    client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('657eebee47b7d687dd0b');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);