"use client";

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
    useEffect(() => {
        // Fade in from bottom animation for sections
        const sections = gsap.utils.toArray('.animate-section');
        sections.forEach((section: any) => {
            gsap.fromTo(
                section,
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Parallax effect for backgrounds
        const parallaxElements = gsap.utils.toArray('.parallax-bg');
        parallaxElements.forEach((element: any) => {
            gsap.to(element, {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        });

        // Scale up animation for cards
        const cards = gsap.utils.toArray('.animate-card');
        cards.forEach((card: any, index: number) => {
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: index * 0.1,
                }
            );
        });

        // Slide in from left
        const slideLeftElements = gsap.utils.toArray('.slide-in-left');
        slideLeftElements.forEach((element: any) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    x: -100,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Slide in from right
        const slideRightElements = gsap.utils.toArray('.slide-in-right');
        slideRightElements.forEach((element: any) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    x: 100,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Stagger animation for lists
        const staggerLists = gsap.utils.toArray('.stagger-list');
        staggerLists.forEach((list: any) => {
            const items = list.querySelectorAll('.stagger-item');
            gsap.fromTo(
                items,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: list,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return null;
}
