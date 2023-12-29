import { Mongo } from 'meteor/mongo';

/** @type {import('./types').LinksCollection} */
export const LinksCollection = new Mongo.Collection('links');
