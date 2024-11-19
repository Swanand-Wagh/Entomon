export type BlogFormProps = {
  form: any;
  onSubmit: any;
  handleResetBlog: any;
  handleCoverImageChange: any;
  coverImagePreview: string | null;
  handleContainerClick: any;
  isPending: boolean;
  error: string | undefined;
  success: string | undefined;
  editor: any;
  fileInputRef: any;
};

export type SingleBlogData = {
  slug: string;
  id: string;
  title: string;
  coverImage: string;
  categories: string[];
  isPaid: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
