'use client'
import { atom } from 'jotai';

export const atomSidebarActive = atom(false);
export const atomTagList = atom<string[]>([]);

export const atomLoginDependency = atom<boolean>(false);