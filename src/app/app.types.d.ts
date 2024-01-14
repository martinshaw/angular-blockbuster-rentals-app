/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: app.types.d.ts
Created:  2024-01-14T13:37:44.368Z
Modified: 2024-01-14T13:37:44.368Z

Description: description
*/

export type MovieType = {
  id: number;
  thumbnail: string;
  title: string;
  year: string;
  length: {
      h: number;
      m: number;
      s: number;
  },
  rating: string;
  ranking: number;
  voteCount: string;
  metarating: string;
  description: string;
};
