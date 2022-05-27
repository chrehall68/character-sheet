#include <stdio.h>
#include <fstream>
#include <string>

using namespace std;

// generator for the xpbar styles
int main()
{
  ofstream o("./out.css");
  for (int i = 0; i <= 100; ++i)
  {
    o << ".sheet-xpbar .sheet-barstuff "
      << "input[value=\"" << i << "\"].sheet-valholder~div.sheet-bar{\n";
    o << "    background: linear-gradient(to left, white " << 100 - i << "%, black " << 100 - i << "%, black " << i << "%);";
    o << "\n}\n\n";
  }
  o.close();
}