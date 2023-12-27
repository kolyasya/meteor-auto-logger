interface Link {
  _id: string;
  title: string;
  url: string;
  createdAt: Date;
}

type LinksCollection = Mongo.Collection<Link>;
