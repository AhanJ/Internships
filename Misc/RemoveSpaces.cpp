#include <iostream>
#include <string>

using namespace std;

void space_remover(string &s)
{
    int spaceCount = 0;
    int i = 0;

    while (i + spaceCount < s.length())

    {
        if (s[i + spaceCount] != ' ')

        {
            swap(s[i], s[i + spaceCount]);
            i++;
        }

        else

        {
            spaceCount++;
        }
    }
}

int main()

{
    string s = "aa bb cc d    e f ggg h h";
    space_remover(s);

    cout << s;

    return 0;
}