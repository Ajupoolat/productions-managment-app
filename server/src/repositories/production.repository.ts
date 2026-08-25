import { Types } from 'mongoose';
import { Production, IProduction } from '../models/production.model';
import { CreateProductionInput } from '../dto/production/production.dto';
import { ApiFeatures } from '../utils/apiFeatures';

export const create = async (
  data: CreateProductionInput,
  productionManagerId: string
): Promise<IProduction> => {
  return await Production.create({
    ...data,
    productionManagerId: new Types.ObjectId(productionManagerId),
  });
};

export const findAll = async (queryString: any = {}): Promise<{ data: IProduction[], meta: any }> => {
  const query = Production.find().populate('productionManagerId', 'firstName lastName email');
  
  const features = new ApiFeatures(query, queryString)
    .filter()
    .search(['name', 'description'])
    .sort();

  await features.countTotal();
  features.paginate();

  const data = await features.query;
  const meta = features.getPaginationMeta();

  return { data, meta };
};

export const findById = async (id: string): Promise<IProduction | null> => {
  return await Production.findById(id).populate(
    'productionManagerId',
    'firstName lastName email'
  );
};

export const updateById = async (
  id: string,
  data: Partial<CreateProductionInput>
): Promise<IProduction | null> => {
  return await Production.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).populate('productionManagerId', 'firstName lastName email');
};

export const deleteById = async (id: string): Promise<IProduction | null> => {
  return await Production.findByIdAndDelete(id);
};
