import { Request, Response } from 'express';
import {District} from '../db/models/district';
import {Province} from '../db/models/province';

export const getProvinces = async (req: Request, res: Response) => {
  const provinces = await Province.find({
    relations: ['districts'],
  })
  res.json(provinces);
};
