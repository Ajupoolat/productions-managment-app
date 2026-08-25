export class ApiFeatures {
  query: any;
  queryString: any;
  totalCount: number;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
    this.totalCount = 0;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering (gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const parsedQuery = JSON.parse(queryStr);
    
    // Convert 'status' to array if it is a comma-separated string (e.g. for multi-select filtering)
    if (parsedQuery.status && typeof parsedQuery.status === 'string') {
      parsedQuery.status = { $in: parsedQuery.status.split(',') };
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  search(searchFields: string[]) {
    if (this.queryString.search && searchFields.length > 0) {
      const searchRegex = new RegExp(this.queryString.search, 'i');
      
      const searchConditions = searchFields.map((field) => ({
        [field]: searchRegex,
      }));

      this.query = this.query.find({ $or: searchConditions });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  async countTotal() {
    // Clone the query to count without pagination limits
    const countQuery = this.query.model.find(this.query.getFilter());
    this.totalCount = await countQuery.countDocuments();
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page as string, 10) || 1;
    const limit = parseInt(this.queryString.limit as string, 10) || 12;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  getPaginationMeta() {
    const page = parseInt(this.queryString.page as string, 10) || 1;
    const limit = parseInt(this.queryString.limit as string, 10) || 12;
    const totalPages = Math.ceil(this.totalCount / limit) || 1;

    return {
      total: this.totalCount,
      page,
      limit,
      totalPages,
    };
  }
}
