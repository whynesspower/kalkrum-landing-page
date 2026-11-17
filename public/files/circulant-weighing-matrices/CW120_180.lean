-- Lean 4 check of one CW(120,36) and one CW(180,36) (weight and autocorrelation), and of a mutant of the first that must fail.
def aval (P N : List Nat) (j : Nat) : Int := if P.contains j then 1 else if N.contains j then -1 else 0
def corr (n : Nat) (P N : List Nat) (s : Nat) : Int :=
  (P ++ N).foldl (fun acc i => acc + aval P N i * aval P N ((i + s) % n)) 0
def isCW (n k : Nat) (P N : List Nat) : Bool :=
  (P ++ N).all (fun i => i < n) && (P ++ N).length == k && ((P ++ N).eraseDups).length == k &&
  corr n P N 0 == k && (List.range (n - 1)).all (fun t => corr n P N (t + 1) == 0)
def P120 : List Nat := [17, 26, 30, 37, 42, 54, 57, 58, 60, 62, 68, 70, 77, 84, 94, 97, 98, 106, 112, 116, 117]
def N120 : List Nat := [0, 2, 6, 8, 14, 18, 24, 50, 52, 56, 66, 74, 78, 102, 110]
theorem cw120 : isCW 120 36 P120 N120 = true := by decide +kernel
def P180 : List Nat := [0, 1, 3, 6, 9, 15, 27, 31, 61, 63, 69, 81, 91, 102, 114, 121, 138, 141, 147, 151, 165]
def N180 : List Nat := [12, 21, 24, 33, 39, 48, 75, 87, 90, 96, 105, 111, 123, 129, 177]
theorem cw180 : isCW 180 36 P180 N180 = true := by decide +kernel
def N120m : List Nat := [1, 2, 6, 8, 14, 18, 24, 50, 52, 56, 66, 74, 78, 102, 110]
theorem cw120mut : isCW 120 36 P120 N120m = false := by decide +kernel
