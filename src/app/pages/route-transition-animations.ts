import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

//, Two => Three, One => Three
//, Three => One
// Three => Two, 
export const routeTransitionAnimations = trigger('triggerName', [
    transition('One => Two', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				right: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ top: '100%', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('1s ease-out', style({ top: '-100%', opacity: 0 }))]),
			query(':enter', [animate('1s ease-out', style({ top: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	]),
	transition('Two => One', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ top: '-100%', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('1s ease-out', style({ top: '100%', opacity: 0 }))]),
			query(':enter', [animate('1s ease-out', style({ top: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	]),

    // Config Animation
    transition('One => Three, Two => Three', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ 
            clipPath: 'circle(0% at 0 100%)', 
            // opacity: 0, 
        })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('1s ease-out', style({ opacity: 0 }))]),
			query(':enter', [animate('1s ease-out', style({ clipPath: 'circle(142% at 0 100%)' }))])
		]),
		query(':enter', animateChild())
	]),
    transition('Three => One, Three => Two', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ 
            opacity: 0, 
        })]),
		query(':leave', [style({ 
                clipPath: 'circle(142% at 0 100%)' 
            }),
         animateChild()]),
		group([
			query(':leave', [animate('1s ease-out', style({ clipPath: 'circle(0% at 0 100%)' }))]),
			query(':enter', [animate('1s ease-out', style({ opacity: 1 }))])
		]),
		query(':enter', animateChild())
	])
]);