const cl = console.log;

const blogForm = document.getElementById('blogForm');
const titleControl = document.getElementById('title');
const contentControl = document.getElementById('content');
const blogContainer = document.getElementById('blogContainer');


const snackBar = (msg, icon) => {
    swal.fire({
        title : msg,
        icon : icon,
        timer : 3000,
    })
}
let blogArr = [];

const createCards = (arr) => {
    let result = '';
    arr.forEach(blog => {
        result += `<div class="col-md-6 offset-2">
                <div class="card my-3">
                    <div class="card-header bg-info">
                        <h4>${blog.title}</h4>
                    </div>
                    <div class="card-body bg-warning">
                        <p>${blog.content}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-sm btn-outline-info">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Remove</button>
                    </div>
                </div>
            </div> `
    });
    blogContainer.innerHTML = result;
}


const createBlog = (blog) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = Math.random() >= 0.3 ? false : true;
            if(!error){
                blogArr.push(blog);
                resolve('Blogs created successfully!!')
            }else{
                reject('something went wrong while creating blog!!!')
            }
        }, 1500);
    })
}

const fetchBlog = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = Math.random() >= 0.3 ? false : true;
            if(!error){
                resolve(blogArr)
            }else{
                reject('something went wrong while fetching blog!!!')
            }
        }, 1000);
    })
}

const onBlogAdd = (eve) => {
    eve.preventDefault();
    let blogObj = {
        title : titleControl.value,
        content : contentControl.value,
    }
    cl(blogObj);
    blogForm.reset();

    createBlog(blogObj)
    .then(res => {
        cl(res);
        return fetchBlog();
    })
    .then(res => {
        cl(res);
        createCards(res)
    })
    .catch(err => {
        snackBar(err, 'error');
    })
    
}

blogForm.addEventListener('submit', onBlogAdd);



