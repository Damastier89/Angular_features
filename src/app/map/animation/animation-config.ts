import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const SIDEBAR_ANIMATION_SWITCHER: AnimationTriggerMetadata = trigger('toggleSidebar', [
  state('open', style({
    minWidth: '26.3%',
    maxWidth: '30%',
  })),
  state('close', style({
    minWidth: '0px',
    maxWidth: '0%',
    width: '0',
    padding: '0',
  })),
  transition('open <=> close', [
    animate('0.2s')
  ])
])
