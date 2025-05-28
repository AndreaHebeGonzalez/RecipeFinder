import gsap from "gsap";

/* Modal */

export const modalOpenAnimation = (element: HTMLDivElement ) => {
  const modal = element.querySelector('#modal')
  const tl: GSAPTimeline = gsap.timeline()

  tl.set(modal, {
    opacity: 1,
    scale: 0,
    rotateX: 0,
    xPercent: -50,
    yPercent: -50,
    //transformOrigin: 'center center',
  });

  tl.to(element, {
    display: 'block',
    duration: 0.5,
  }).to(element, {
    opacity: 1,
    duration: 0.5,
    ease: 'circ.in'
  }).to(modal, {
    scale: 1,
    duration: 0.5,
    ease: 'back.out(1.7)'
  },'<.4')
}

export const modalCloseAnimation = (element: HTMLDivElement ) => {
  const modal = element.querySelector('#modal')

  const tl: GSAPTimeline = gsap.timeline()

  tl.to(modal, {
    rotateX: 90, 
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }).to(element, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, '<')
  .set(element, { display: 'none' })  
  .set(modal, { 
    rotateX: 0,
    scale: 0.5,
    opacity: 1 
  })
}

/* Notification */


export const progressBarNotification = (notificationBox: HTMLDivElement, progressBar: HTMLDivElement, closeNotification: () => void, isError: boolean) => {
  gsap.set(notificationBox, { opacity: 0 })
  gsap.set(progressBar, {width: '0'})

  const tl: GSAPTimeline = gsap.timeline({
  onComplete: () => {
    closeNotification()
  }
})

  tl.to(notificationBox, {
    opacity: 1, 
    duration: 0.2
  })

  if(isError) {
      tl.to(notificationBox, {
      x: () => gsap.utils.random(-5, 5),
      duration: 0.05,
      repeat: 10,
      yoyo: true,
      ease: 'none'
    }, '<+=0.03')
  }
  
  tl.to(progressBar, {
    width: '100%',
    duration: 4.5,
    ease: 'none'
  },'<+=0.03')
  .to(notificationBox, {
    y: '20%',
    opacity: 0,
    duration: 0.3
  })
}


/* 
gsap.to('.ventana', {
  x: () => gsap.utils.random(-5, 5),
  y: () => gsap.utils.random(-5, 5),
  rotation: () => gsap.utils.random(-2, 2),
  duration: 0.05,
  repeat: 10,
  yoyo: true,
  ease: 'none'
});

*/