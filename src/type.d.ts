interface IPost {
  userId: number
  title: string
  body: string
}

type UserState = {
  users: IPost[]
}

type UserAction = {
  type: string
  post: IPost
}

type DispatchType = (args: IPostAction) =>IPostAction