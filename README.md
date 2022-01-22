<div align="center">
  <h1> project name: Wmeedh :high_brightness: </h1>
  </div>

<div align="center">
  <h3>  Why did I choose the word wmeedh ? </h3>

##### Initially, the meaning of the word  ``` wmeedh ```  is a tiny light that suddenly shines in some crystals when exposed to radiation or radioactive particles. This platform helps and gives glow to every user who wants a service and did not find it, here he finds all kinds of services without taking a long time and effortless search. #####

<br/>

  <h3> :bulb: Description </h3>

##### On our platform, you can find service providers, and you can put your question or inquiry and you will find an answer to it. You can put your evaluation on the services that you have tried and liked, and also make an appointment with the service provider,and also enter into a chat with him and discuss what you want and agree with him. You can also pay through a wallet inside the site or use a visa or credit card. #####

</div>


<br/>

# :paperclip: Links:

### :heavy_check_mark: `Trello:`
https://trello.com/b/p0lIavji/mprawanbadr

### :heavy_check_mark: `Slides:`
https://slides

### :heavy_check_mark: `Server Repositories:`
https://github.com/MP-Project-Rawan-Badr/server/blob/main/README.md

### :heavy_check_mark: `Deploy:`
https://mp-ffront.herokuapp.com/
<br/>


## :black_nib: User Story

- Register: Anyone can signUp in the platform and choose if wants to be a service provider or user.
- Login: After choosing , is moving to the login page to enter the platform with his own service.
- Logout: As user, I can logout from the platform.
- Add inquiry or quesion: Both a service provider and user can add .
- Rating: Can user rate the service provider has dealt with.
- Appointment: Can user make a daily , weakly or monthly appointment with the service provider.
- Pay: Can user pay to the service provider through the wallet inside the platform.
- Add post: Can service provider add post that includes picture, name, region, and description of his work.
- Reminder: Gets reminder of his appointments
- Status:  service provider has a status to let other users know if it is busy or available.
- Search: Both a service provider and user are able to search the platform.
- Chat: Both a service provider and user are can communicate between them.


## :black_nib: Admin Story
- Delete users:  He can spam any user if the rating is low with convincing reason.
- Delete posts:  He can delete the posts if they are inappropriate

<br/>

 <h2> :pencil: library </h2>

- ![React](https://img.shields.io/badge/react-ccccff?style=for-the-badge&logo=react&logoColor=black)
- ![Redux](https://img.shields.io/badge/redux-9797d3?style=for-the-badge&logo=redux&logoColor=white)
- ![axios](https://img.shields.io/badge/axios-baa1ba?style=for-the-badge&logo=axios&logoColor=white)

<br/>


## :file_folder: React Routes 

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | StartPage            | public                              | It is visible to people who are not registered in the platform                                          |
| `/register`        | RegisterPage       | anon only                         | Signup form, link to login, navigate to homepage after signup|
| `/login`         | LoginPage            | anon only                           | Login form, link to signup, navigate to homepage after login |
| `/forgotPass`    | ForgotPassPage       | user                                | send link on email                                  |
| `/resetPass`     | ResetPassPage        | user                                | Retype the password                                 |
| `/signWithGoogle`| SignWithGooglePage   | user                                | sign with google                                    |
| `/home`          | HomePage             | user and admin and service provider | Shows the latest updates of inquiries and posts                                    |
| `/posts`         | PostsPage            | admin and service provider          | Shows all posts                                     |
| `/post/:id`      | PostPage             | admin and service provider          | update and delete post                              |
| `/Profile`       | ProfilePage          | user and admin and service provider | see and edit profile                                        |
| `/Inquiries`     | InquiriesPage        | user and admin and service provider | show inquiries                              |
| `/Inquiry`       | InquiryPage          | user and admin and service provider | see inquiry, edit, and delete                             |
| `/users`         | usersPage            | user only                           | see,add inquiry,edit and delete & see home & profile|
| `/serviceProviders`| ServiceProvidersPage | service provider only             | see,add,edit,delete post and inquiry & see home &profile  |



<br/>

## :file_folder: Components:
- Register
- Login
- Home
- Posts
- Post
- Profile
- Inquiries
- Inquiry
- Forgot Password
- ResetPass
- Sign With Google
- Users
- Service providers


<br/>

# :triangular_ruler: UML Diagram:
![Screenshot (331)](https://user-images.githubusercontent.com/92247926/146680667-4b0c18e6-03e2-4a0e-b843-a506b51318da.png)


### :art: Wireframe
![Screenshot (329)](https://user-images.githubusercontent.com/92247926/146675684-38355463-ebed-4253-85aa-c0bddd094f24.png)
![Screenshot (324)](https://user-images.githubusercontent.com/92247926/146675720-35b8208b-8119-4c7e-b72a-0c5edd163523.png)
![Screenshot (323)](https://user-images.githubusercontent.com/92247926/146675722-4b8b80f4-7d98-41ad-af02-1f70316faa16.png)

![Screenshot (325)](https://user-images.githubusercontent.com/92247926/146675730-51fc3caf-aefc-46c9-90c2-7d07ed9ed505.png)
![Screenshot (326)](https://user-images.githubusercontent.com/92247926/146675735-73d64115-5644-474b-b866-aa0d2c7281ee.png)


![Screenshot (330)](https://user-images.githubusercontent.com/92247926/146675838-de0db948-9a55-499e-84a2-ddafff6ce56c.png)
![Screenshot (327)](https://user-images.githubusercontent.com/92247926/146675841-50b95d1c-de8d-47bc-817b-6e3def951d5d.png)




