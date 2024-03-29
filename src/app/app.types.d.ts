/*
All Rights Reserved, (c) 2024 CodeAtlas LTD.

Author: Martin Shaw (developer@martinshaw.co)
File Name: app.types.d.ts
Created:  2024-01-14T13:37:44.368Z
Modified: 2024-01-14T13:37:44.368Z

Description: description
*/

export type MovieFromDataScrapingType = {
  id?: number;
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

export type MovieModelType = MovieFromDataScrapingType & {
  // In reality, these would be cached counts from a separate table of individual items owned by Blockbuster.
  // But for the purposes of this demo, we'll just use a random number.
  count_available_for_sale: number;
  count_available_for_rental: number;
  count_owned: number;

  barcode: string;
};

export type MovieRentalPriceModelType = {
  movie_id: number;
  price: number;
  period:
    | '1 day'
    | '2 days'
    | '3 days'
    | '1 week'
    | '2 weeks'
    | '3 weeks'
    | '1 month'
    | '2 months'
    | '3 months'
};

export type CustomerModelType = {
  id?: number;

  name: string;
  email: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;

  rentals?: RentalModelType[];
};

export type RentalModelType = {
  id?: number;

  start_date_at: Date | null;
  end_date_at: Date | null;
  return_date_at: Date | null;

  period: MovieRentalPriceModelType['period'];

  customer_id: number;

  customer?: CustomerModelType;
  // If the mock API allowed, I would alias this as `movies` and include the `movies` model as a nested many-to-many pivot relationship
  rentalMoviePivot?: RentalMoviePivotModelType[];
};

export type RentalMoviePivotModelType = {
  rental_id: number;
  movie_id: number;
  return_date_at: Date | null;

  movie?: MovieModelType;
};
