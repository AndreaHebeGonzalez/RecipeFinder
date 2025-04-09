import gsap from "gsap";

export const modalOpenAnimation = (element: HTMLDivElement ) => {
  const modal = element.querySelector('#modal')
  const tl: GSAPTimeline = gsap.timeline();

  tl.set(modal, {
    opacity: 1,
    scale: 0,
    rotateX: 0
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
  const tl: GSAPTimeline = gsap.timeline();

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