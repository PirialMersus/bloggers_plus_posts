import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

export interface blogger {
    id: number,
    name: string,
    youtubeUrl: string
}

export interface post {
    id: number,
    bloggerId: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerName: string
}

interface IErrorMessage {
    data: {
        additionalProp1: string,
        additionalProp2: string,
        additionalProp3: string
    },
    errorsMessages: [
        {
            message: string,
            field: string
        }
    ],
    resultCode: number
}

const errorObj: IErrorMessage = {
    data: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: '',
    },
    errorsMessages: [{
        message: '',
        field: ''
    }],
    resultCode: 0
}

let bloggers: Array<blogger> = [
    {
        id: 0,
        name: 'first blogger',
        youtubeUrl: 'https://www.youtube.com/channel/UCNH9VJDJVt8pXg4TEUHh76w'
    },
    {
        id: 1,
        name: 'second blogger',
        youtubeUrl: 'https://www.youtube.com/c/ITKAMASUTRA'
    },
]
let posts: Array<post> = [
    {
        id: 0,
        bloggerId: 0,
        title: 'first post',
        shortDescription: 'short description 1',
        content: 'content of the first post',
        bloggerName: 'first blogger'
    },
    {
        id: 1,
        bloggerId: 1,
        title: 'second post',
        shortDescription: 'short description 2',
        content: 'content of the second post',
        bloggerName: 'firs blogger'
    }
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello: World!!!');
})

app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggers);
})
app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
})

app.post('/bloggers', (req: Request, res: Response) => {
    if (!req.body.name) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'name',
        }]
        res.status(400).send(errorObj)
    }
    if (!req.body.youtubeUrl) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'youtubeUrl',
        }]
        res.status(400).send(errorObj)
    }
    const regExp = new RegExp("https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$");
    if (!regExp.test(req.body.youtubeUrl)) {
        errorObj.errorsMessages = [{
            message: 'enter correct value',
            field: 'youtubeUrl',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.youtubeUrl.length > 100) {
        errorObj.errorsMessages = [{
            message: 'youtubeUrl length should be less then 100',
            field: 'youtubeUrl',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.name.length > 15) {
        errorObj.errorsMessages = [{
            message: 'name length should be less then 15',
            field: 'name',
        }]
        res.status(400).send(errorObj)
    }
    const newBlogger = {
        id: bloggers.length,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl
    }
    bloggers.push(newBlogger)
    res.status(201).send(newBlogger)

})
app.post('/posts', (req: Request, res: Response) => {
    if (!req.body.title) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'title',
        }]
        res.status(400).send(errorObj)
    }
    if (!req.body.shortDescription) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'shortDescription',
        }]
        res.status(400).send(errorObj)
    }
    if (!req.body.content) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'content',
        }]
        res.status(400).send(errorObj)
    }
    if (!req.body.bloggerId) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'bloggerId',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.title.length > 30) {
        errorObj.errorsMessages = [{
            message: 'title length should be less then 30',
            field: 'title',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.shortDescription.length > 100) {
        errorObj.errorsMessages = [{
            message: 'shortDescription length should be less then 100',
            field: 'shortDescription',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.bloggerId.length > 1000) {
        errorObj.errorsMessages = [{
            message: 'bloggerId length should be less then 1000',
            field: 'bloggerId',
        }]
        res.status(400).send(errorObj)
    }
    const bloggerName = bloggers.find(blogger => blogger.id === +req.body.bloggerId)
    const newPost = {
        id: posts.length,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: +req.body.bloggerId,
        bloggerName: bloggerName ? bloggerName.name : 'unknown'
    }
    posts.push(newPost)
    res.status(201).send(newPost)

})

app.put('/bloggers/:id', (req: Request, res: Response) => {
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    if (req.params.id === 'empty') {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'id',
        }]
        res.status(400).send(errorObj)
    }
    if (!name) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'name',
        }]
        res.status(400).send(errorObj)
    }
    if (!youtubeUrl) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'youtubeUrl',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.name.length > 15) {
        errorObj.errorsMessages = [{
            message: 'name length should be less then 15',
            field: 'name',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.youtubeUrl.length > 100) {
        errorObj.errorsMessages = [{
            message: 'youtubeUrl length should be less then 100',
            field: 'youtubeUrl',
        }]
        res.status(400).send(errorObj)
    }
    const regExp = new RegExp("https://([a-zA-Z0-9_-]+.)+[a-zA-Z0-9_-]+(/[a-zA-Z0-9_-]+)*/?$");
    if (!regExp.test(req.body.youtubeUrl)) {
        errorObj.errorsMessages = [{
            message: 'enter correct value',
            field: 'youtubeUrl',
        }]
        res.status(400).send(errorObj)
    }

    const id = +req.params.id;

    const blogger = bloggers.find(video => video.id === id)
    if (blogger) {
        blogger.name = name;
        blogger.youtubeUrl = youtubeUrl;
        res.status(204).send(blogger)
    } else {
        errorObj.errorsMessages = [{
            message: 'Required blogger not found',
            field: 'none',
        }]
        res.status(404).send(errorObj)
    }
})

app.put('/posts/:id', (req: Request, res: Response) => {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const bloggerId = req.body.bloggerId;

    if (req.params.id === 'empty') {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'id',
        }]
        res.status(400).send(errorObj)
    }
    if (!title) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'title',
        }]
        res.status(400).send(errorObj)
    }
    if (!shortDescription) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'shortDescription',
        }]
        res.status(400).send(errorObj)
    }
    if (!content) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'content',
        }]
        res.status(400).send(errorObj)
    }
    if (!bloggerId) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'bloggerId',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.title.length > 30) {
        errorObj.errorsMessages = [{
            message: 'title length should be less then 30',
            field: 'title',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.shortDescription.length > 100) {
        errorObj.errorsMessages = [{
            message: 'shortDescription length should be less then 100',
            field: 'shortDescription',
        }]
        res.status(400).send(errorObj)
    }
    if (req.body.bloggerId.length > 1000) {
        errorObj.errorsMessages = [{
            message: 'bloggerId length should be less then 1000',
            field: 'bloggerId',
        }]
        res.status(400).send(errorObj)
    }

    const id = +req.params.id;

    const post = posts.find(post => post.id === id)
    if (post) {
        post.title = title;
        post.shortDescription = shortDescription;
        post.content = content;
        post.bloggerId = bloggerId;
        res.status(204).send(post)
    } else {
        errorObj.errorsMessages = [{
            message: 'Required post not found',
            field: 'none',
        }]
        res.status(404).send(errorObj)
    }
})

app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!req.params.id) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'id',
        }]
        res.status(404).send(errorObj)
    }
    const resultBloggers = bloggers.filter(blogger => blogger.id !== id)

    if (resultBloggers.length === bloggers.length) {
        errorObj.errorsMessages = [{
            message: 'Required blogger not found',
            field: 'none',
        }]
        res.status(404).send(errorObj)
    } else {
        bloggers = resultBloggers;
        res.send(204)
    }
})

app.delete('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!req.params.id) {
        errorObj.errorsMessages = [{
            message: 'enter input value',
            field: 'id',
        }]
        res.status(404).send(errorObj)
    }
    const resultPosts = posts.filter(post => post.id !== id)
    if (resultPosts.length === bloggers.length) {
        errorObj.errorsMessages = [{
            message: 'Required post not found',
            field: 'none',
        }]
        res.status(404).send(errorObj)
    } else {
        posts = resultPosts;
        res.send(204)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})