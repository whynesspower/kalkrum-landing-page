LoadPackage("smallgrp");
out:=OutputTextFile("index.tsv",false); SetPrintFormattingStatus(out,false);
for n in [1..32] do
  for i in [1..NrSmallGroups(n)] do
    G:=SmallGroup(n,i);
    if n=32 and not IsAbelian(G) then continue; fi;
    el:=Elements(G); id:=Position(el,One(G)); el:=Concatenation([One(G)],Filtered(el,x->x<>One(G)));
    if n=1 then continue; fi;
    nm:=Concatenation("G",String(n),"_",String(i));
    f:=OutputTextFile(Concatenation(nm,".tab"),false); SetPrintFormattingStatus(f,false);
    AppendTo(f,n,"\n");
    for a in el do
      for b in el do AppendTo(f,Position(el,a*b)-1," "); od;
      AppendTo(f,"\n");
    od;
    CloseStream(f);
    sy:=SylowSubgroup(G,2);
    ab:=""; if IsAbelian(G) then ab:=String(AbelianInvariants(G)); fi;
    AppendTo(out,nm,"\t",n,"\t",i,"\t",StructureDescription(G:short),"\t",IsAbelian(G),"\t",ab,"\t",Size(sy),"\t",IsCyclic(sy),"\t",Size(Centre(G)),"\t",Size(DerivedSubgroup(G)),"\t",Collected(List(el,Order)),"\n");
  od;
od;
CloseStream(out);
QUIT;
