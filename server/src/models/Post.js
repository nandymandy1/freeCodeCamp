import { Schema, model } from "mongoose";
import Paginator from "mongoose-paginate-v2";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postImage: {
      type: String,
      default:
        "http://www.surgesonelectric.com/wp-content/themes/azoomtheme/images/demo/demo-image-default.jpg",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

PostSchema.plugin(Paginator);

const Post = model("posts", PostSchema);
export default Post;
