---
date: "2018-12-18"
title: "Vim Commands"
tags: ['vim', 'commands']
---
List of useful commands for vim editing.

* `q[uit]`
* `q[uit]!`
* `a` : append text after the cursor
* `A` : append text at the end of line
* `o` : begin a new line below cursor
* `O` : begin a new line above cursor

* `dd` : delete lines
* `p` : put text from register after cursor
* `x` : delete character at cursor
* `u` : undo changes
* `.` : repeat last change

* `gg` : goto first line
* `G` : goto last line
* `b` : step word backward
* `e` : step word forward

### Search and replace
* `:s/foo/bar/g` : replace all foo with bar on current line

### Select and copy or move
1. Press `v` to begin character-based visual selection, or `V` to select whole lines.
2. Move cursor to select text.
3. Press `d` (delete) to cut, or `y` (yank) to copy.
4. Press `p` to paste after the cursor, or `P` to paste before.

### Other
```
:set tabstop=x shiftwidth=x expandtab
```
