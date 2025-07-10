export interface Address {
  fulladdress: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: 'M' | 'F';
  address: Address;
}


export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  phone: string;
  gender: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface IUserLoginRequest{
      email:string;
    password:string;
}

export interface IUserResponse{
  message: string;
  accessToken: string;
}


export interface AddProductRequest {
  name: string;
  price: number;
  desc: string;
  brandName: string;
  categoryName: string;
  subCategoryName: string;
  stock: number;
  img: string; 
}

export interface AddProductResponse {
  message: string;
  data: {
    _id: string;
    name: string;
    price: number;
    desc: string;
    imgURL: string;
    brandId: {
      _id: string;
      brandName: string;
    };
    categoryId: {
      _id: string;
      categoryName: string;
    };
    subCategoryId: {
      _id: string;
      subCategoryName: string;
    };
    stock: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    __v: number;
  };
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  desc: string;
  imgURL: string;
  brandId: { _id: string; brandName: string };
  categoryId: { _id: string; categoryName: string };
  subCategoryId: { _id: string; subCategoryName: string };
  stock: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProductResponse {
  message: string;
  data: IProduct;
}

export interface IBrand {
  _id: string;
  brandName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBrandResponse {
  message: string;
  data: IBrand[];
}

export interface ISingleBrandResponse {
  message: string;
  data: IBrand;
}

export interface IAddBrand {
  brandName: string;
}


export interface ICategory {
  _id: string;
  categoryName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategoryResponse {
  message: string;
  data: ICategory[];
}

export interface ISingleCategoryResponse {
  message: string;
  data: ICategory;
}

export interface IAddCategory {
  categoryName: string;
}

export interface ISubCategory {
  _id: string;
  subCategoryName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface ISubCategoryResponse {
  message: string;
  data: ISubCategory[];
}

export interface IAddSubCategory {
  subCategoryName: string;
}

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface IFaqAddResponse {
  message: string;
  data: IFaq;
}
export interface IFaqAddRequest {
  question: string;
  answer: string;
}


export interface IFaqGetResponse {
  message: string;
  data: IFaq[];
}

export interface ITestimonial {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  user: string; 
  createdAt: string;   
  updatedAt: string;
  __v: number;
}
export interface ITestimonialAddRequest {
  title: string;
  description: string;
}

export interface ITestimonialAddResponse {
  message: string;
  data: ITestimonial;
}

export interface ITestimonialGetResponse {
  message: string;
  data: ITestimonial[];
}

export interface IAddAboutUs {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  user: string; 
  createdAt: string;   
  updatedAt: string;
  __v: number;
}
export interface IAddAboutUsRequest { 
  title: string;
  description: string;
}

export interface IAddAboutUsResponse {
  message: string;
  data: IAddAboutUs;
}

export interface IGetAboutUsResponse {
  message: string;
  data: IAddAboutUs[];
}

export interface IRemoveCartItemRequest {
  productId: string;
}

export interface ICartResponseData{
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    desc: string;
    imgURL: string;
    brandId: string;
    categoryId: string;
    subCategoryId: string;
  };
  quantity: number;
  price: number;
  priceChanged: boolean;
  user: string;
  isDeleted: boolean; 
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRemoveCartItemResponse {
  message: string;
  data: ICartResponseData;
}

export interface IGetCartResponse {
  message: string;
  data: ICartResponseData[];
}

export interface IFav{
  user: string;
  product: string;
  isDeleted: boolean;
  isAdded: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFavGetResponse{
  message: string;
  data:[
    {
      _id: string;
      user: string;
      product: {
        _id: string;
        name: string;
        price: number;
        imgURL: string;
      }
      isDeleted: boolean;
      isAdded: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ]
}
export interface IFavRemoveResponse{
  message: string;

}