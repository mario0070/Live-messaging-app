import React, { useEffect, useRef, useState } from 'react'
import "/public/css/dashboard.css"
import logo from "/public/img/login_image.png"
import $ from 'jquery';
import typing from "/public/img/typing1.gif"

export default function Dashboard() {
    const [logoName, setLogoName] = useState("Doot")
    const [msgInput, setMsgInput] = useState("")
    const [tab, setTab] = useState("chat")
    const msg = useRef("")

    let newDate = new Date()
    let hrs = newDate.getHours();
    let fulltime = newDate.getHours();
    let mins = newDate.getMinutes();
    if(hrs > 12){
        hrs -= 12
    }
    if(mins <= 9){
        mins = "0" + mins
    }

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    })

    const sendMsg = () => {
        $(".msg_body").append(`
        <div class="wrap2 unique mt -2">
        <p class='mb-0 msgIcon text-end mb-0'>
            <img src=${logo} alt="img" width=${30} />
        </p>
        <div class="sentMsg mb-0 mt-0">
            <div class="myMsg">
                <p class="mb-0 p-2">${msg.current.value}</p>
            </div>
          </div>
          <p class='time text-end mx-3'><i class="fa-regular fa-clock"></i> ${hrs}:${fulltime >= 12  ? mins +" pm" : mins + " am"}</p>
        </div>`)
        $(".msg_body").scrollTop($(".msg_body").height()*200);
        msg.current.value = ""

        setTimeout(() => {
            $(".msg_body").append(`
            <div class="wrap1 unique pt-4">
                <div class="">
                    <p class='mb-0 msgIcon text-start mb-0'>
                        <img src=${logo} alt="img" class='' width=${30} />
                    </p>
                    <div class="msgBodys mb-0 mt-0">
                        <p class='mb-0 p-2'>Hello baddo, we are not available at the moment, please try again later !!</p>
                    </div>
                    <p class='time text-start mx-3'><i class="fa-regular fa-clock"></i> ${hrs}:${fulltime >= 12  ? mins +" pm" : mins + " am"}</p>
                </div>
            </div> `)
            $(".msg_body").scrollTop($(".msg_body").height()*200);
        },1000)
    }

    const switchTab = (name) => {
        setTab(name)
    }

    const editUser = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Personal Information",
            html: `
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" class="text-muted" placeholder="Username">
                <span class="input-group-text"><i class="fa-solid fa-pen"></i></span>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-inbox"></i></span>
                <input type="text" class="text-muted" placeholder="Email address">
                <span class="input-group-text"><i class="fa-solid fa-pen"></i></span>
            </div>
            <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-location"></i></span>
                <input type="text" class="text-muted" placeholder="Address">
                <span class="input-group-text"><i class="fa-solid fa-pen"></i></span>
            </div>
            `,
            focusConfirm: true,
            confirmButtonText: "Save Changes",
            background: "azure",
            preConfirm: () => {
              return [
                "yeah"
              ];
            }
        });
        if (formValues) {
        Swal.fire(JSON.stringify(formValues));
        }

    }

    const logOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your account will be log out",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4eac6d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout !!",
            background: "azure",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Logged Out!",
                text: "Your account has been logged out.",
                icon: "success"
              });
            }
          });
    }

    const slideNav = () => {
        var chat_container = document.querySelector(".chat_container")
        var users = document.querySelector(".users")
        users.classList.toggle("hide_user");
        chat_container.classList.toggle("show_container");
    }

    return (
        <div className='dashboard fade_load'>
            <div className="all_contents">
                <div className="d-flex">

                    <div className="navigation text-center nav-tabs" role="tablist">
                        <a data-bs-toggle="tab" className='active' title='messages' href='#chat' onClick={() => switchTab("chat")}><i className="fa-solid fa-message"></i></a>
                        <a data-bs-toggle="tab" title='chats' href='#chat' onClick={() => switchTab("chat")}><i className="fa-solid fa-comments"></i></a>
                        <a data-bs-toggle="tab" title='settings' href='#settings' onClick={() => switchTab("settings")}><i className="fa-solid fa-gear"></i></a>
                        <a data-bs-toggle="tab" title='profile' href='#profile' onClick={() => switchTab("profile")}><i className="fa-solid fa-user"></i></a>
                        <a data-bs-toggle="tab" title='contact' href='#contact' onClick={() => switchTab("contact")}><i className="fa-solid fa-address-book"></i></a>
                        <a data-bs-toggle="tab" title='calls' href='#calls' onClick={() => switchTab("calls")}><i className="fa-solid fa-phone"></i></a>
                        <p onClick={logOut}><a title='logout' href="#logout"><i className="fa-solid fa-right-from-bracket"></i></a></p>
                    </div>

                    <div className="users">
                       {
                        tab == "chat" &&
                        <>
                            <div className="head">
                                    <div className="d-flex">
                                        <h2 onClick={slideNav} className="fw-bold">Chats</h2>
                                        <p className="mb-0"><i className="fa-solid fa-plus"></i></p>
                                    </div>
                            </div>

                            <div className="flow">
                                <div className="favourites">
                                    <p className="text-muted fw-bold mb-2">FAVOURITES</p>
                                        <div className="d-flex cont">
                                            <p className="mb-0 name d-flex">
                                                <p className="user_icon mb-0 text-center pt-1">JM</p>
                                                <p className="mb-0 mx-2 mt-1">jamiu</p>
                                            </p>
                                            <p className="mb-0 total_msg">1208</p>
                                        </div>
                                        <div className="d-flex cont">
                                            <p className="mb-0 name d-flex">
                                                <p className="user_icon mb-0 text-center pt-1">JM</p>
                                                <p className="mb-0 mx-2 mt-1">jamiu</p>
                                            </p>
                                            <p className="mb-0 total_msg">18</p>
                                        </div>
                                        <div className="d-flex cont">
                                            <p className="mb-0 name d-flex">
                                                <p className="user_icon mb-0 text-center pt-1">JM</p>
                                                <p className="mb-0 mx-2 mt-1">jamiu</p>
                                            </p>
                                            <p className="mb-0 total_msg">18</p>
                                        </div>
                                        <div className="d-flex cont">
                                            <p className="mb-0 name d-flex">
                                                <p className="user_icon mb-0 text-center pt-1">JM</p>
                                                <p className="mb-0 mx-2 mt-1">jamiu</p>
                                            </p>
                                            <p className="mb-0 total_msg">18</p>
                                        </div>
                                        <div className="d-flex cont">
                                            <p className="mb-0 name d-flex">
                                                <p className="user_icon mb-0 text-center pt-1">JM</p>
                                                <p className="mb-0 mx-2 mt-1">jamiu</p>
                                            </p>
                                            <p className="mb-0 total_msg">18</p>
                                        </div>
                                </div>
                                
                                <div className="favourites">
                                    <p className="text-muted fw-bold mb-2">MESSAGE BOT</p>
                                    <div className="d-flex cont">
                                        <p className="mb-0 name d-flex">
                                            <p className="user_icon mb-0 text-center pt-1">JM</p>
                                            <p className="mb-0 mx-2 mt-1">Computer sc. related</p>
                                        </p>
                                        <p className="mb-0 total_msg">34</p>
                                    </div>
                                    <div className="d-flex cont">
                                        <p className="mb-0 name d-flex">
                                            <p className="user_icon mb-0 text-center pt-1">JM</p>
                                            <p className="mb-0 mx-2 mt-1">Education Bot</p>
                                        </p>
                                        <p className="mb-0 total_msg">72</p>
                                    </div>
                                </div>

                                <div className="favourites">
                                    <p className="text-muted fw-bold mb-2">CHANNELS</p>
                                    <div className="d-flex cont">
                                        <p className="mb-0 name d-flex">
                                            <p className="fs-5 mb-0">#</p>
                                            <p className="mb-0 mt-1 mx-2">Group Name</p>
                                        </p>
                                        <p className="mb-0 total_msg">18</p>
                                    </div>
                                    <div className="d-flex cont">
                                        <p className="mb-0 name d-flex">
                                            <p className="fs-5 mb-0">#</p>
                                            <p className="mb-0 mt-1 mx-2">Group Name</p>
                                        </p>
                                        <p className="mb-0 total_msg">18</p>
                                    </div>
                                </div>
                            </div>
                        </> }

                        {
                            tab == "profile" &&
                            <>
                                <div className="profile">
                                    <div className="head">
                                        <img src={logo} alt="" />
                                    </div>

                                    <div className="info">
                                        <div className="text-center header">
                                            <img src={logo} alt="" />
                                            <p className="fw-bold mb-1">Ganiu Jamiu</p>
                                            <p className="">Frontent dev</p>
                                        </div>
                                        <div className="p-3 scroll">
                                            <p className="text-muted">If several languages coalesce, the grammar of the resulting language is more simple.</p>
                                            <div className="d-flex">
                                                <p className="mb-0"><i className="fa-solid fa-user"></i></p>
                                                <p className="mb-0 mx-2">Ganiu jamiu</p>
                                            </div>

                                            <div className="d-flex">
                                                <p className="mb-0"><i className="fa-solid fa-inbox"></i></p>
                                                <p className="mb-0 mx-2">ganiujamiu@gmail.com</p>
                                            </div>

                                            <div className="d-flex">
                                                <p className="mb-0"><i className="fa-solid fa-location"></i></p>
                                                <p className="mb-0 mx-2">Location</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        {
                            tab == "settings" &&
                            <div className="profile settings">
                                <div className="head">
                                    <img src="https://www.verywellfamily.com/thmb/vy3Au-X1TWDhdFNFcIJn_FfshMk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-places-to-buy-kids-clothes-5190552-v1-d45adce7b25f414e89d16a85dc7e077f.jpg" alt="" />
                                </div>

                                <div className="info">
                                    <div className="text-center">
                                        <img src="https://www.verywellfamily.com/thmb/vy3Au-X1TWDhdFNFcIJn_FfshMk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-places-to-buy-kids-clothes-5190552-v1-d45adce7b25f414e89d16a85dc7e077f.jpg" alt="" />
                                    </div>
                                    <div className="py-3 scroll">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header"  data-bs-toggle="collapse" href="#collapseOne">
                                                  <div className="d-flex">
                                                       <div className="">
                                                            <i className="fa-solid fa-user"></i>
                                                            <a className="">
                                                            Personal Information
                                                            </a>
                                                       </div>
                                                        <div>
                                                        <i className="fa-solid fa-arrow-down-wide-short"></i>
                                                        </div>
                                                  </div>
                                                </div>
                                                <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
                                                    <div className="card-body information">
                                                        <div className="d-flex mb-0">
                                                            <div className="">
                                                                <p className="mb-1">Name</p>
                                                                <p className="fw-semibold">Ganiu jamiu</p>
                                                            </div>
                                                            <div className="edit">
                                                                <p onClick={editUser} className="mb-0 btn"><i className="fa-solid text-white fa-pen"></i></p>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mb-0">
                                                            <div className="">
                                                                <p className="mb-1">Email</p>
                                                                <p className="fw-semibold">ganiujamiu03@gmail.com</p>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mb-0">
                                                            <div className="">
                                                                <p className="mb-1">Location</p>
                                                                <p className="fw-semibold">lagos island</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-header"  data-bs-toggle="collapse" href="#collapseTwo">
                                                   <div className="d-flex">
                                                        <div className="">
                                                            <i className="fa-solid fa-lock"></i>
                                                            <a className="collapsed">
                                                            Privacy
                                                            </a>
                                                        </div>
                                                        <div className="">
                                                            <i className="fa-solid fa-arrow-down-wide-short"></i>
                                                        </div>
                                                   </div>
                                                </div>
                                                <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                                                    <div className="card-body collapseTwo">
                                                        <div className="d-flex">
                                                            <p className="mb-0">Profile photo</p>
                                                            <select name="" id="">
                                                                <option value="">Everyone</option>
                                                                <option value="">Nobody</option>
                                                                <option value="">Selected</option>
                                                            </select>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p className="mb-0">Last seen</p>
                                                            <p className="mb-0"><i className="fa-solid fa-toggle-on"></i></p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p className="mb-0">Status</p>
                                                            <select name="" id="">
                                                                <option value="">Everyone</option>
                                                                <option value="">Nobody</option>
                                                                <option value="">Selected</option>
                                                            </select>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p className="mb-0">Read receipts</p>
                                                            <p className="mb-0"><i className="fa-solid fa-toggle-on"></i></p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p className="mb-0">Groups</p>
                                                            <select name="" id="">
                                                                <option value="">Nobody</option>
                                                                <option value="">Everyone</option>
                                                                <option value="">Selected</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-header" data-bs-toggle="collapse" href="#collapseThree">
                                                   <div className="d-flex">
                                                        <div className="">
                                                            <i className="fa-solid fa-shield-halved"></i>
                                                            <a className="collapsed">
                                                            Security
                                                            </a>
                                                        </div>
                                                        <div className="">
                                                            <i className="fa-solid fa-arrow-down-wide-short"></i>
                                                        </div>
                                                   </div>
                                                </div>
                                                <div id="collapseThree" className="collapse" data-bs-parent="#accordion">
                                                    <div className="card-body collapseThree">
                                                        <div className="d-flex">
                                                            <p className="mb-0">Show security notification</p>
                                                            <p className="mb-0"><i className="fa-solid fa-toggle-off"></i></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card">
                                                <div className="card-header"  data-bs-toggle="collapse" href="#collapseFour">
                                                   <div className="d-flex">
                                                        <div className="">
                                                            <i className="fa-solid fa-circle-info"></i>
                                                            <a className="collapsed">
                                                            Help
                                                            </a>
                                                        </div>
                                                        <div className="">
                                                            <i className="fa-solid fa-arrow-down-wide-short"></i>
                                                        </div>
                                                   </div>
                                                </div>
                                                <div id="collapseFour" className="collapse" data-bs-parent="#accordion">
                                                    <div className="card-body">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            tab == "contact" &&
                            <>
                                 <div className="text-center calls mt-5">
                                    <h2 className='fw-bold pt-5 text-muted'>No Contacts !!</h2>
                                    <p className="text-muted">You don't have any contact.</p>
                                </div>
                            </>
                        }

                        {
                            tab == "calls" &&
                            <>
                                <div className="text-center calls mt-5">
                                    <h2 className='fw-bold pt-5 text-muted'>No Calls !!</h2>
                                    <p className="text-muted">You don't have any call.</p>
                                </div>
                            </>
                        }

                    </div>

                    <div className="chat_container">
                        <div className="head d-flex">
                            <div className="username d-flex">
                                <i className="fa-solid fa-arrow-left d-none" onClick={slideNav}></i>
                                <p className="mb-0 pt-2 fw-bold profile_pic">GJ</p>
                                <div className="mx-2">
                                    <p className="names fw-bold mb-1">Ganiu jamiu</p>
                                    <div className="d-flex">
                                        <p className="mb-0">Online</p>
                                        <p className="mb-0 mx-2"><i className="fa-regular fa-clock top_clock"></i> {hrs}:{fulltime >= 12  ? mins +" pm" : mins + " am"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="icons d-flex">
                                <p data-bs-placement="bottom" data-bs-toggle="tooltip" title='search' className="mb-0"><i className="fa-solid fa-magnifying-glass"></i></p>
                                <p data-bs-placement="bottom" data-bs-toggle="tooltip" title='voice call' className="mb-0"><i className="fa-solid fa-phone-volume"></i></p>
                                <p data-bs-placement="bottom" data-bs-toggle="tooltip" title='video call' className="mb-0"><i className="fa-solid fa-video"></i></p>
                                <p data-bs-placement="bottom" data-bs-toggle="tooltip" title='more info' className="mb-0"><i className="fa-solid fa-circle-info"></i></p>
                            </div>
                        </div>

                        <div className="msg_body">
                            <div className="wrap1 unique pt-4">
                                <div className="">
                                    <p className='mb-0 msgIcon text-start mb-0'>
                                        <img src={logo} alt="img" className='' width={30} />
                                    </p>
                                    <div className="msgBodys mb-0 mt-0">
                                        <p className='mb-0 p-2'>Hello baddo, what questions do you have for me today? </p>
                                    </div>
                                    <p className='time text-start mx-3'><i className="fa-regular fa-clock"></i> 10:16 am</p>
                                </div>
                            </div>       

                            <div className="wrap2 mt-2">
                                <p className='mb-0 msgIcon text-end mb-0'>
                                    <img src={logo} alt="img" className='' width={30} />
                                </p>
                                <div className="sentMsg mb-0 mt-0">
                                    <div className="myMsg">
                                        <p className="mb-0 p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ad et mollitia labore doloribus eligendi pariatur! Deleniti sint iure accusantium ullam autem labore architecto praesentium expedita, eligendi, beatae alias fuga.</p>
                                    </div>
                                </div>
                                <p className='time text-end mx-3'><i className="fa-regular fa-clock"></i> 10:16 am</p>
                            </div>

                            {/* <div className="wrap1 ai">
                                <div className="mx-4 mt-5">
                                    <img src={typing} alt="" className='typing' />
                                </div>
                            </div> */}
                        </div>

                        <div className="inputs">
                            <div className="d-flex">
                                <textarea ref={msg} onChange={e => setMsgInput(e.target.value)} placeholder='Type your message.....'></textarea>
                                <button onClick={sendMsg} className="btn">send message <i className="fa-solid fa-paper-plane"></i></button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
